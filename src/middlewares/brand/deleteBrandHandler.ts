import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteBrandHandler = async (brandId: number) => {
  try {
    // Verificar si la marca existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!existingBrand) {
      throw new Error("No se encontró una marca con el ID proporcionado.");
    }

    // Desvincular los productos asociados a esta marca
    await prisma.product.updateMany({
      where: { brandId }, // Filtra los productos que tienen esta marca
      data: { brandId: null }, // Establece brandId como null
    });

    // Eliminar la marca
    await prisma.brand.delete({
      where: { id: brandId },
    });
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
