import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleCategoryStatusHandler = async (categoryId: number) => {
  try {
    // Verificar si la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new Error("No se encontró una categoría con el ID proporcionado.");
    }

    // Cambiar el estado de isDisabled
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        isDisabled: !existingCategory.isDisabled,
      },
    });

    return updatedCategory;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};