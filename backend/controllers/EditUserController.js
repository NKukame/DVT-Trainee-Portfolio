import { EmployeeRole } from "@prisma/client";
import { clearCache } from "../lib/prisma-redis-middleware.js";
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
        if(edu.id){

          await prisma.education.update({
            where: { id: edu.id },
            data: {
              institution: edu.institution,
              qualification: edu.qualification,
            },
          });
        }else{
          await prisma.education.create({
            data: {
              institution: edu.institution,
              qualification: edu.qualification,
              employeeId: id,
            },
          });
        }
      }
    }

    if (certificates && Array.isArray(certificates)) {
      for (const cert of certificates) {
        if (cert.id) {
          // Update existing certificate
          await prisma.certificate.update({
            where: { id: cert.id },
            data: {
              name: cert.name,
              institution: cert.institution,
            },
          });
        } else {
          // Create new certificate
          await prisma.certificate.create({
            data: {
              name: cert.name,
              institution: cert.institution,
              employeeId: id, // 🔑 link to employee
            },
          });
        }
      }
    }


    if (testimonials && Array.isArray(testimonials)) {
      for (const testimonial of testimonials) {
        if (testimonial.id) {
          // Update existing testimonial
          await prisma.testimonial.update({
            where: { id: testimonial.id },
            data: {
              quote: testimonial.quote,
              company: testimonial.company,
              reference: testimonial.reference,
            },
          });
        } else {
          // Create new testimonial
          await prisma.testimonial.create({
            data: {
              quote: testimonial.quote,
              company: testimonial.company,
              reference: testimonial.reference,
              employeeId: id, // Make sure to associate with the employee
            },
          });
        }
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
        await prisma.project.update({
          where: { id: project.id },
          data: {
            name: project.name,
            description: project.description,
            github: project.github
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

    if (req.body.career && Array.isArray(req.body.career)) {
      for (const job of req.body.career) {
        if (job.id) {
          await prisma.career.update({
            where: { id: job.id },
            data: {
              role: job.role,
              company: job.company,
              duration: job.duration,
            },
          });
        } else {
          await prisma.career.create({
            data: {
              employeeId: id,
              role: job.role,
              company: job.company,
              duration: job.duration,
            },
          });
        }
      }
    }

    clearCache();


    res.status(200).json({ message: "User Updated", user: updateUser });
  } catch (error) {
    res.status(500).json({ ProblemUpdating: error });
    console.log(error);
  }
}
