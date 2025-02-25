import { PrismaClient } from "@prisma/client";
import { CategoryInput } from "../../utils/interface";

const prisma = new PrismaClient();

export const addCategoryHandler = async (categoryData: CategoryInput) => {
  const { name, isDisable } = categoryData;

  if (!name) {
    throw new Error("Name is required to create the category");
  }

  try {
    // Verificar si la categoría ya existe
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }

    // Crear la categoría en la base de datos con Prisma
    const newCategory = await prisma.category.create({
      data: {
        name,
        isDisabled: isDisable ?? false, // Valor por defecto si no se envía
      },
    });

    return newCategory;
  } catch (error) {
    throw new Error(`Failed to create category: ${(error as Error).message}`);
  }
};
