import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all collections for a user
export const getUserCollections = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const collections = await prisma.collection.findMany({
      where: { userId },
      include: {
        bookmarks: {
          include: {
            bookmark: {
              include: {
                employee: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new collection
export const createCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description } = req.body;

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        userId
      }
    });

    res.json({ collection, message: 'Collection created successfully' });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get collection by ID with bookmarks
export const getCollectionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId } = req.params;

    const collection = await prisma.collection.findFirst({
      where: { 
        id: collectionId,
        userId 
      },
      include: {
        bookmarks: {
          include: {
            bookmark: {
              include: {
                employee: {
                  include: {
                    techStack: {
                      include: {
                        techStack: true
                      }
                    },
                    availability: true,
                    education: true,
                    certificates: true,
                    career: true,
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
                    testimonials: true,
                    softSkills: {
                      include: {
                        softSkill: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.json({ collection });
  } catch (error) {
    console.error('Error fetching collection:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add bookmark to collection
export const addBookmarkToCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId, employeeId, bookmarkId } = req.body;

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId }
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    let bookmark;
    
    // If employeeId is provided, find bookmark by employeeId
    if (employeeId) {
      bookmark = await prisma.bookmark.findFirst({
        where: { 
          employeeId: employeeId, 
          userId 
        }
      });
    } 
    // Otherwise use bookmarkId
    else if (bookmarkId) {
      bookmark = await prisma.bookmark.findFirst({
        where: { id: bookmarkId, userId }
      });
    }

    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Check if already in collection
    const existing = await prisma.collectionBookmark.findUnique({
      where: {
        collectionId_bookmarkId: {
          collectionId,
          bookmarkId: bookmark.id
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Bookmark already in collection' });
    }

    // Add to collection
    await prisma.collectionBookmark.create({
      data: {
        collectionId,
        bookmarkId: bookmark.id
      }
    });

    res.json({ message: 'Bookmark added to collection' });
  } catch (error) {
    console.error('Error adding bookmark to collection:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove bookmark from collection
export const removeBookmarkFromCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId, bookmarkId } = req.body;

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId }
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    await prisma.collectionBookmark.delete({
      where: {
        collectionId_bookmarkId: {
          collectionId,
          bookmarkId
        }
      }
    });

    res.json({ message: 'Bookmark removed from collection' });
  } catch (error) {
    console.error('Error removing bookmark from collection:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete collection
export const deleteCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId } = req.params;

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId }
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    await prisma.collection.delete({
      where: { id: collectionId }
    });

    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error deleting collection:', error);
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