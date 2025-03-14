import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleUserStatusHandler = async (userId: number) => {
  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("No se encontró un usuario con el ID proporcionado.");
    }

    // Cambiar el estado de isDisabled
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isDisabled: !existingUser.isDisabled, // Cambia el valor al opuesto
      },
    });

    // No devolver la contraseña hasheada por seguridad
    const { passwordHashed: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};