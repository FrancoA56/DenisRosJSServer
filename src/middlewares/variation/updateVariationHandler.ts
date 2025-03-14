import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateVariationData {
  type?: string;
  code?: string;
  name?: string;
  imageUrl?: string;
  price?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
}

export const updateVariationHandler = async (id: number, variationData: UpdateVariationData) => {
  try {
    // Verificar si la variación existe
    const existingVariation = await prisma.variation.findUnique({
      where: { id },
    });

    if (!existingVariation) {
      throw new Error("Variación no encontrada.");
    }

    // Actualizar la variación
    const updatedVariation = await prisma.variation.update({
      where: { id },
      data: variationData,
    });

    return updatedVariation;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};