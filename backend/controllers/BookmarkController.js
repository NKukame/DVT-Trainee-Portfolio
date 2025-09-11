import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all bookmarks for a user
export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        employee: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
            techStack: {
              select: {
                Techrating: true,
                techStack: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            availability: {
              select: {
                available: true,
              },
            },
            softSkills: {
              select: {
                skillsRating: true,
                softSkill: true,
                softSkillId: true,
              },
            },
            education: {
              select: {
                id: true,
                institution: true,
                qualification: true,
              },
            },
            certificates: {
              select: {
                id: true,
                name: true,
                institution: true,
              },
            },
            career: {
              select: {
                id: true,
                role: true,
                company: true,
                duration: true,
              },
            },
            projects: {
              select: {
                project: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    github: true,
                    demo: true,
                    screenshot: true,
                    createdAt: true,
                    updatedAt: true,
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
            testimonials: {
              select: {
                id: true,
                quote: true,
                company: true,
                reference: true,
              },
            },
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format bookmarks like search results with complete data
    const formattedBookmarks = bookmarks.map(bookmark => ({
      employee_id: bookmark.employee.id,
      name: bookmark.employee.name + " " + bookmark.employee.surname,
      surname: bookmark.employee.surname,
      title: bookmark.employee.title,
      phone: bookmark.employee.phone,
      company: bookmark.employee.company,
      email: bookmark.employee.email,
      github: bookmark.employee.github,
      user: bookmark.employee.user,
      linkedIn: bookmark.employee.linkedIn,
      portfolio: bookmark.employee.portfolio,
      testimonials: bookmark.employee.testimonials || [],
      role: capitalizeFirstLetter(bookmark.employee.role),
      softSkilled: bookmark.employee.softSkills,
      years_active: bookmark.employee.experience || "0-1 Years",
      experienced: bookmark.employee.experience,
      department: capitalizeFirstLetter(bookmark.employee.department),
      bio: bookmark.employee.bio,
      availability: bookmark.employee.availability?.available,
      location: bookmark.employee.location?.split(",")[0] || bookmark.employee.location,
      emp_education: bookmark.employee.education,
      certificates: bookmark.employee.certificates,
      career: bookmark.employee.career,
      projects: bookmark.employee.projects,
      avatar: bookmark.employee.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      techStack: bookmark.employee.techStack,
      skills: bookmark.employee.techStack.map(link => link.techStack.name),
      bookmarkId: bookmark.id,
      bookmarkedAt: bookmark.createdAt
    }));

    res.json({ bookmarks: formattedBookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Toggle bookmark (add/remove)
export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { employeeId } = req.body;

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_employeeId: {
          userId,
          employeeId
        }
      }
    });

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id }
      });
      res.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
      // Add bookmark
      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          employeeId
        }
      });
      res.json({ bookmarked: true, message: 'Bookmark added', bookmarkId: bookmark.id });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Check if employee is bookmarked
export const checkBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { employeeId } = req.params;

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_employeeId: {
          userId,
          employeeId
        }
      }
    });

    res.json({ bookmarked: !!bookmark, bookmarkId: bookmark?.id });
  } catch (error) {
    console.error('Error checking bookmark:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

function capitalizeFirstLetter(str) {
  if(str.includes("_")){
    return str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
}