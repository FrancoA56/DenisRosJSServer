import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateCategoryNameHandler = async (categoryId: number, newName: string) => {
  try {
    // Verificar si la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new Error("No se encontró una categoría con el ID proporcionado.");
    }

    // Verificar si el nuevo nombre ya existe en otra categoría
    const categoryWithSameName = await prisma.category.findUnique({
      where: { name: newName },
    });

    if (categoryWithSameName && categoryWithSameName.id !== categoryId) {
      throw new Error("Ya existe una categoría con este nombre.");
    }

    // Actualizar el nombre de la categoría
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: newName,
      },
    });

    return updatedCategory;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};