import prisma from "../lib/prisma-redis-middleware.js";

// import { Prisma, PrismaClient } from '@prisma/client';

export default async function EditUserController(req, res) {
    try{
// const { email } = req.params;
const { id, name, surname, photoUrl, department, bio, experience, availability, linkedIn, github, role, projects, career, education, certificates, testimonials, location, softSkills, techStack } = req.body;
    const updateUser = await prisma.employee.update({
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
        availability: {
          update: {
            available: availability,
          },
        },
        linkedIn: `${linkedIn}`,
        github: `${github}`,
        role: `${role}`,
        career: {
          update: {
            where: {
              id: `${career.careerID}`,
            },
            data: {
              role: `${career.role}`,
              company: `${career.company}`,
              duration: `${career.duration}`,
            },
          },
        },
        education: {
          update: {
            where: {
              id: `${education.educationID}`,
            },
            data: {
              institution: `${education.institution}`,
              qualification: `${education.qualification}`,
            },
          },
        },
        certificates: {
          update: {
            where: {
              id: `${certificates.certificateID}`,
            },
            data: {
              name: `${certificates.name}`,
              institution: `${certificates.institution}`,
            },
          },
        },
        location: `${location}`,
        softSkills: {
          update: {
            where: {
              employeeId_softSkillId: {
                employeeId: id,
                softSkillId: softSkills.softSkillID,
              },
            },
            data: {
              skillsRating: softSkills.skillsRating,
            },
          },
        },
        techStack: {
          update: {
            where: {
              employeeId_techStackId: {
                employeeId: id,
                techStackId: techStack.techStackID,
              },
            },
            data: {
              Techrating: techStack.Techrating,
            },
          },
        },
        //   projects: {
        //     select: {
        //       project: {
        //         select: {
        //           id: true,
        //           name: true,
        //           description: true,
        //           members: {
        //             select: {
        //               employee: {
        //                 select: {
        //                   name: true,
        //                   photoUrl: true,
        //                 },
        //               },
        //             },
        //           },
        //           techStack: {
        //             select: {
        //               techStack: {
        //                 select: {
        //                   name: true,
        //                 },
        //               },
        //             },
        //           },
        //           github: true,
        //           demo: true,
        //           screenshot: true,
        //           createdAt: true,
        //           updatedAt: true,
        //           industries: {
        //             select: {
        //               project: {
        //                 select: {
        //                   industries: {
        //                     select: {
        //                       industry: {
        //                         select: {
        //                           name: true,
        //                         },
        //                       },
        //                     },
        //                   },
        //                 },
        //               },
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },

        testimonials: {
          update: {
            where: {
              id: testimonials.testimonialID,
            },
            data: {
              quote: testimonials.quote,
              company: testimonials.company,
              reference: testimonials.reference,
            },
          },
        },
      },
    });

    if (projects && projects.length > 0) {
      for (const project of projects) {
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
      }
    }

    res.json("User Updated" , updateUser)
    }catch(error)
    {   
        res.json({ProblemUpdating: error })
        console.log(error);
    }

}