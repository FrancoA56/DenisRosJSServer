import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum Role {
  CLIENTE = "CLIENTE",
  GESTOR = "GESTOR",
  ADMIN = "ADMIN",
}

export const updateUserRoleHandler = async (userId: number, role: Role) => {
  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("No se encontró un usuario con el ID proporcionado.");
    }

    // Actualizar el rol del usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role, // Actualizar el rol
      },
    });

    // No devolver la contraseña hasheada por seguridad
    const { passwordHashed: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};