import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategoriesHandler = async (includeDisabled: boolean = false) => {
  try {
    const categories = await prisma.category.findMany({
      where: includeDisabled ? {} : { isDisabled: false }, // Filtro condicional
    });

    return categories;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};