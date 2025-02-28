import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleBrandStatusHandler = async (brandId: number) => {
  try {
    // Verificar si la marca existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!existingBrand) {
      throw new Error("No se encontró una marca con el ID proporcionado.");
    }

    // Cambiar el estado de isDisabled
    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        isDisabled: !existingBrand.isDisabled, // Cambia el valor al opuesto
      },
    });

    return updatedBrand;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};