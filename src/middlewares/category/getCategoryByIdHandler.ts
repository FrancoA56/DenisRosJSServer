import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryByIdHandler = async (categoryId: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    return category;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};