import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteVariationHandler = async (id: number) => {
  try {
    // Verificar si la variación existe
    const existingVariation = await prisma.variation.findUnique({
      where: { id },
    });

    if (!existingVariation) {
      throw new Error("Variación no encontrada.");
    }

    // Eliminar la variación
    await prisma.variation.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};