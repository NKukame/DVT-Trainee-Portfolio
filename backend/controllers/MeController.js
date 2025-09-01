import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MeController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: {
          include: {
            user: true,
            availability: true,
            techStack: {
              include: {
                techStack: true
              }
            },
              projects: {
            select: {
              project: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  members: {
                    select: {
                      employee: {
                        select: {
                          name: true,
                          photoUrl: true,
                        },
                      },
                    },
                  },
                  techStack: {
                    select: {
                      techStack: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                  github: true,
                  demo: true,
                  screenshot: true,
                  createdAt: true,
                  updatedAt: true,
                  industries: {
                    select: {
                      project: {
                        select: {
                          industries: {
                            select: {
                              industry: {
                                select: {
                                  name: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
            testimonials: true,
            education: true,
            certificates: true,
            career: true,
            softSkills: {
              include: {
                softSkill: true
              }
            }
          }
        }
      }
    });
    
    if (!user || !user.employee) {
      return res.status(404).json({ error: 'User or employee data not found' });
    }
    
    // Return employee data in the format expected by UserPortfolio components (same as search results)
    res.json({
      ...user.employee,
      employee_id: user.employee.id,
      name: user.employee.name + " " + user.employee.surname,
      user: user,
      avatar: user.employee.photoUrl,
      availability: user.employee.availability?.available,
      emp_education: user.employee.education,
      years_active: user.employee.experience,
      experienced: user.employee.experience,
      user_role: user.role,
      role: capitalizeFirstLetter(user.employee.role)
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

function capitalizeFirstLetter(str) {
  if(str.includes("_")){
    return str
      .split("_")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }else{
    
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

}

export default MeController;