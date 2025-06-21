import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProfileController(req, res) {
  console.log("createProfileController called");

  const titleMap = {
    "Mr": "MR",
    "Mrs": "MRS",
    "Ms": "MS",
    "Dr": "DR"
  };

  const roleMap = {
    "Developer": "DEVELOPER",
    "Designer": "DESIGNER",
    "Project Manager": "PROJECT_MANAGER",
    "Team Lead": "TEAM_LEAD",
    "Senior Developer": "SENIOR_DEVELOPER"
  };
  const departmentMap = {
    "Engineering": "ENGINEERING",
    "Design": "DESIGN",
    "Marketing": "MARKETING",
    "Sales": "SALES",
    "HR": "HR"
  };
  try {
    const { basicInfo, skills, career, testimonials, links, status } = req.body;

    console.log(req.body);


    const employee = await prisma.employee.create({
      data: {
        title: basicInfo.title,
        name: basicInfo.firstName,
        birthday: basicInfo.birthday ? new Date(basicInfo.birthday).toISOString() : null,
        surname: basicInfo.lastName,
        bio: basicInfo.introductionDescription,
        role: roleMap[basicInfo.role] || "DEVELOPER",
        location: basicInfo.location,
        email: basicInfo.email,
        phone: basicInfo.phone,
        company: basicInfo.company,
        github: links.github,
        linkedIn: links.linkedin,
        portfolio: links.portfolio,
        department: departmentMap[career.department] || "ENGINEERING",
      },
    });

    // Availability Table
    await prisma.availability.create({
      data: {
        employeeId: employee.id,
        available: status.status === "Available",
        client: status.assignedClient || "",
      },
    });

    // Education Table
    if (
      skills.educationEntries &&
      skills.educationEntries.length > 0 &&
      (skills.educationEntries[0].qualification || skills.educationEntries[0].institution)
    ) {
      const edu = skills.educationEntries[0];
      await prisma.education.create({
        data: {
          institution: edu.institution,
          qualification: edu.qualification,
          employeeId: employee.id,
        },
      });
    }

    // Tech Stack Table
    if (
      skills.selectedTechnologies &&
      skills.selectedTechnologies.length > 0
    ) {
      for (const techName of skills.selectedTechnologies) {
        const techStackRecord = await prisma.techStack.findUnique({
          where: { name: techName },
        });
        if (techStackRecord) {
          await prisma.employeeTechStack.create({
            data: {
              employeeId: employee.id,
              techStackId: techStackRecord.id,
              years: skills.techExperience?.[techName] || null,
            },
          });
        }
      }
    }

    // Soft Skills Table
    if (
      skills.selectedSoftSkills &&
      skills.selectedSoftSkills.length > 0
    ) {
      for (const skillName of skills.selectedSoftSkills) {
        const softSkillRecord = await prisma.softSkill.findUnique({
          where: { name: skillName },
        });
        if (softSkillRecord) {
          await prisma.employeeSoftSkill.create({
            data: {
              employeeId: employee.id,
              softSkillId: softSkillRecord.id,
              skillsRating: skills.softSkillRatings?.[skillName] || null,
            },
          });
        }
      }
    }

    // Testimonials Table
    if (
      testimonials.testimonials &&
      testimonials.testimonials.length > 0
    ) {
      for (const t of testimonials.testimonials) {
        await prisma.testimonial.create({
          data: {
            employeeId: employee.id,
            company: t.company || "",
            quote: t.text || "",
            reference: t.reference || "",
          },
        });
      }
    }

    // Projects Table
    if (career.projects && career.projects.length > 0) {
      for (const proj of career.projects) {
        let project = await prisma.project.findUnique({
          where: { name: proj.name },
        });

        if (!project) {
          project = await prisma.project.create({
            data: {
              name: proj.name,
              description: proj.description,
              github: proj.repoLink || null,
              demo: proj.demoLink || null,
              screenshot: proj.image || null,
            },
          });
        }

        // Relate the current employee as a member
        await prisma.projectMember.create({
          data: {
            projectId: project.id,
            employeeId: employee.id,
            role: employee.role,
          },
        });

        // Relate technologies
        if (proj.technologies && proj.technologies.length > 0) {
          for (const techName of proj.technologies) {
            const tech = await prisma.techStack.findUnique({ where: { name: techName } });
            if (tech) {
              await prisma.projectTechStack.upsert({
                where: {
                  projectId_techStackId: {
                    projectId: project.id,
                    techStackId: tech.id,
                  },
                },
                update: {},
                create: {
                  projectId: project.id,
                  techStackId: tech.id,
                },
              });
            }
          }
        }

        // Relate industries
        if (proj.industries && proj.industries.length > 0) {
          for (const industryName of proj.industries) {
            let industry = await prisma.industry.findUnique({ where: { name: industryName } });
            if (!industry) {
              industry = await prisma.industry.create({ data: { name: industryName } });
            }
            await prisma.projectIndustry.upsert({
              where: {
                projectId_industryId: {
                  projectId: project.id,
                  industryId: industry.id,
                },
              },
              update: {},
              create: {
                projectId: project.id,
                industryId: industry.id,
              },
            });
          }
        }

        // If author is not the current user, check for other employees and relate them as members
        if (proj.author && proj.author !== `${employee.name} ${employee.surname}`) {

          const [authorName, authorSurname] = proj.author.split(" ");
          const otherEmployee = await prisma.employee.findFirst({
            where: {
              name: authorName,
              surname: authorSurname,
            },
          });
          if (otherEmployee) {
            await prisma.projectMember.upsert({
              where: {
                projectId_employeeId: {
                  projectId: project.id,
                  employeeId: otherEmployee.id,
                },
              },
              update: {},
              create: {
                projectId: project.id,
                employeeId: otherEmployee.id,
                role: otherEmployee.role,
              },
            });
          }
        }
      }
    }

    return res.status(201).json({ message: "Profile created", employeeId: employee.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create profile" });
  }


}
