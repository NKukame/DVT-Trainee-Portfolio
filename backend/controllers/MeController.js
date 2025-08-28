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
              include: {
                project: {
                  include: {
                    industries: {
                      include: {
                        industry: true
                      }
                    },
                    techStack: {
                      include: {
                        techStack: true
                      }
                    }
                  }
                }
              }
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
      user: user,
      avatar: user.employee.photoUrl,
      availability: user.employee.availability?.available,
      emp_education: user.employee.education,
      years_active: user.employee.experience,
      experienced: user.employee.experience
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default MeController;