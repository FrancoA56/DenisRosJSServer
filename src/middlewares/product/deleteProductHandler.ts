import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteProductHandler = async (id: number) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};