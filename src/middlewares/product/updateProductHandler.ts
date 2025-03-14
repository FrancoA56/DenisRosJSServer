import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProductHandler = async (id: number, productData: any) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: productData,
    });

    return updatedProduct;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};