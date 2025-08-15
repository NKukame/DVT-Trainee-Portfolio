import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MeController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: {
          select: {
            name: true,
            surname: true,
            photoUrl: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const fullName = user.employee ? 
      `${user.employee.name} ${user.employee.surname}`.trim() : 
      user.email.split('@')[0];
    
    res.json({
      id: user.id,
      name: fullName,
      email: user.email,
      profilePicture: user.employee?.photoUrl || null
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default MeController;