import { EmployeeRole } from "@prisma/client";
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
        projects:{
          update:{
            where:{
              projectId_employeeId: {
                projectId: projects.projectID, 
                employeeId: projects.employeeID
              }
            },
            data:{
              project:{
                update:{
                  where:{
                    id: projects.projectID,
                    projectId_employeeId: projects.projectId_employeeId,
                  },
                  data:{
                    name: projects.name,
                  description: projects.description,
                  github: projects.github,
                  demo: projects.demo,
                  screenshot: projects.screenshot,
                  updatedAt: new Date(),
                
                },
                
                }
              }
            }
          }
          
        },
//         projects: {
//   update: {
//     where: { projectId: projects.projectID }, // the relation id
//     data: {
//       project: {
//         update: { 
//           where: { id: projects.projectId_employeeId },
//           data: {name: projects.name,
//           description: projects.description,
//           github: projects.github,
//           demo: projects.demo,
//           screenshot: projects.screenshot,
//           updatedAt: new Date(),

//           // Update members (via join table)
//           member: {
//             update: {
//               where: {
//                 employeeId: projects.member.employeeId,
//               },
//               data: {
//                 employee: {
//                   update: {
//                     name: projects.member.name,
//                     photoUrl: projects.member.photoUrl,
//                   },
//                 },
//               },
//             },
//           },

//           // Update tech stack
//           // techStack: {
//           //   update: {
//           //     where: { techStackId: projects.techStack.techStackID },
//           //     data: {
//           //       techStack: {
//           //         update: {
//           //           name: projects.techStack.name,
//           //         },
//           //       },
//           //     },
//           //   },
//           // },

//           // Update industries
//           // industries: {
//           //   update: {
//           //     where: { projectIndustryId: projects.industry.projectIndustryId },
//           //     data: {
//           //       industry: {
//           //         update: {
//           //           name: projects.industry.name,
//           //         },
//           //       },
//           //     },
//           //   },
//           // }, 
//         },
//       },
//     },
//   },
// },
//  },

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
        res.status(500).json({ProblemUpdating: error })
        console.log(error);
    }

}