import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteCategoryHandler = async (categoryId: number) => {
  try {
    // Verificar si la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new Error("No se encontró una categoría con el ID proporcionado.");
    }

    // Desvincular los productos asociados a esta marca
    await prisma.product.updateMany({
      where: { categoryId }, // Filtra los productos que tienen esta marca
      data: { categoryId: null }, // Establece brandId como null
    });

    // Eliminar la categoría
    await prisma.category.delete({
      where: { id: categoryId },
    });
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
