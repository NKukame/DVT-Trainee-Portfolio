import prisma from "../lib/prisma-redis-middleware.js";

export async function UpdateUserController(req, res) {
  try {
    const userId = req.user.id; // From JWT middleware
    const { firstName, lastName } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName,
        lastName: lastName
      }
    });

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}