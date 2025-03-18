import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleProductStatusHandler = async (id: number) => {
  try {
    // Verificar si el producto existe
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Producto no encontrado.");
    }

    // Alternar el valor de isDisabled
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        isDisabled: !product.isDisabled, // Cambia el valor actual
      },
    });

    return updatedProduct;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};