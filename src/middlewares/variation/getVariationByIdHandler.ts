import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getVariationByIdHandler = async (id: number) => {
    try {
      const variation = await prisma.variation.findUnique({
        where: { id },
        include: {
          product: true, // Incluir el producto para obtener sus medidas
        },
      });
  
      if (!variation) {
        throw new Error("Variación no encontrada.");
      }
  
      // Devolver las medidas de la variación o las del producto si no están definidas
      return {
        ...variation,
        length: variation.length ?? variation.product.length,
        width: variation.width ?? variation.product.width,
        height: variation.height ?? variation.product.height,
        weight: variation.weight ?? variation.product.weight,
      };
    } catch (error) {
      throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
    }
  };