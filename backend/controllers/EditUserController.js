import { EmployeeRole } from "@prisma/client";
import prisma from "../lib/prisma-redis-middleware.js";

// import { Prisma, PrismaClient } from '@prisma/client';

export default async function EditUserController(req, res) {
  try {
    // const { email } = req.params;
    const {
      id,
      name,
      surname,
      photoUrl,
      department,
      bio,
      experience,
      availability,
      linkedIn,
      github,
      role,
      projects,
      career,
      education,
      certificates,
      testimonials,
      location,
      softSkills,
      techStack,
    } = req.body;
    const updateUser = await prisma.employee.updateMany({
      where: {
        id: `${id}`,
      },
      data: {
        name: `${name}`,
        surname: `${surname}`,
        photoUrl: `${photoUrl}`,
        department: `${department}`,
        bio: `${bio}`,
        experience: `${experience}`,
        linkedIn: `${linkedIn}`,
        github: `${github}`,
        role: `${role}`,
        location: `${location}`,
      },
    });

    if (education && Array.isArray(education)) {
      for (const edu of education) {
        if (!edu.educationID) continue;
        await prisma.education.update({
          where: { id: edu.educationID },
          data: {
            institution: edu.institution,
            qualification: edu.qualification,
          },
        });
      }
    }

    if (certificates && Array.isArray(certificates)) {
      for (const cert of certificates) {
        if (!cert.certificateID) continue;
        await prisma.certificate.update({
          where: { id: cert.certificateID },
          data: {
            name: cert.name,
            institution: cert.institution,
          },
        });
      }
    }

    if (testimonials && Array.isArray(testimonials)) {
      for (const testimonial of testimonials) {
        if (!testimonial.id) continue;
        await prisma.testimonial.update({
          where: { id: testimonial.id },
          data: {
            quote: testimonial.quote,
            company: testimonial.company,
            reference: testimonial.reference,
          },
        });
      }
    }

    if (typeof availability === "string" || typeof availability === "boolean") {
      await prisma.availability.updateMany({
        where: { employeeId: id },
        data: { available: availability === "true" || availability === true },
      });
    }

    if (projects && Array.isArray(projects)) {
      for (const project of projects) {
        if (!project.projectId) continue;
        await prisma.projectMember.upsert({
          where: {
            projectId_employeeId: {
              projectId: project.projectId,
              employeeId: id,
            },
          },
          update: {
            role: project.role,
          },
          create: {
            projectId: project.projectId,
            employeeId: id,
            role: project.role,
          },
        });
        // Optionally update the project itself if needed
        await prisma.project.update({
          where: { id: project.projectId },
          data: {
            name: project.name,
            description: project.description,
            github: project.github,
            demo: project.demo,
            screenshot: project.screenshot,
            updatedAt: new Date(),
          },
        });
      }
    }

    if (req.body.techStack && Array.isArray(req.body.techStack)) {
      for (const stack of req.body.techStack) {
        await prisma.employeeTechStack.upsert({
          where: {
            employeeId_techStackId: {
              employeeId: id,
              techStackId: stack.techStack?.id || stack.techStackId,
            },
          },
          update: {
            Techrating: stack.Techrating,
          },
          create: {
            employeeId: id,
            techStackId: stack.techStack?.id || stack.techStackId,
            Techrating: stack.Techrating,
          },
        });
      }
    }

    if (req.body.softSkilled && Array.isArray(req.body.softSkilled)) {
      for (const skill of req.body.softSkilled) {
        await prisma.employeeSoftSkill.upsert({
          where: {
            employeeId_softSkillId: {
              employeeId: id,
              softSkillId: skill.softSkillId,
            },
          },
          update: {
            skillsRating: skill.skillsRating,
          },
          create: {
            employeeId: id,
            softSkillId: skill.softSkillId,
            skillsRating: skill.skillsRating,
          },
        });
      }
    }

    res.status(200).json({ message: "User Updated", user: updateUser });
  } catch (error) {
    res.status(500).json({ ProblemUpdating: error });
    console.log(error);
  }
}
