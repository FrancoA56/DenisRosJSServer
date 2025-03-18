import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addVariationHandler = async (variationData: any) => {
  const { productId, stock, type, code, name, imageUrl, price, length, width, height, weight } = variationData;

  if (!productId || !type || !code || !name || !price || !stock) {
    throw new Error("Faltan campos obligatorios para crear la variación.");
  }

  try {
    // Obtener el producto original para tomar sus medidas si no se especifican en la variación
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("El producto no existe.");
    }

    // Crear la variación con las medidas proporcionadas o las del producto
    const newVariation = await prisma.variation.create({
      data: {
        productId,
        type,
        stock,
        code,
        name,
        imageUrl,
        price,
        length: length ?? product.length, // Usar las medidas de la variación o las del producto
        width: width ?? product.width,
        height: height ?? product.height,
        weight: weight ?? product.weight,
      },
    });

    return newVariation;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};