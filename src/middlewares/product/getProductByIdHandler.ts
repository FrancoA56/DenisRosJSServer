import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductByIdHandler = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        variations: true,
        discount: true,
      },
    });

    return product;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};