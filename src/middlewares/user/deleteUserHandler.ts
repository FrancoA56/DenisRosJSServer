import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUserHandler = async (userId: number) => {
  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("No se encontró un usuario con el ID proporcionado.");
    }

    // Cambiar el estado de isDisabled
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return deletedUser;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};