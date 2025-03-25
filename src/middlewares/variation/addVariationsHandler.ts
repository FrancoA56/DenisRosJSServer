import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface VariationOption {
  attributeOptionId: number;
}

interface VariationData {
  sku: string;
  price?: number;
  stock: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  imageUrl?: string;
  isDefault?: boolean;
  options: VariationOption[];
}

export const addVariationsHandler = async (productId: number, variations: VariationData[]) => {
  try {
    // Verificar que el producto existe y obtener su precio base
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Crear variaciones en una transacción
    const createdVariations = await prisma.$transaction(
      variations.map(variation =>
        prisma.productVariation.create({
          data: {
            productId,
            sku: variation.sku,
            price: variation.price ?? product.basePrice, // Usar precio específico o el base
            stock: variation.stock,
            weight: variation.weight ?? product.baseWeight,
            length: variation.length ?? product.baseLength,
            width: variation.width ?? product.baseWidth,
            height: variation.height ?? product.baseHeight,
            imageUrl: variation.imageUrl,
            isDefault: variation.isDefault ?? false,
            options: {
              create: variation.options,
            },
          },
          include: {
            options: {
              include: {
                attributeOption: true,
              },
            },
          },
        })
      )
    );

    return createdVariations;
  } catch (error) {
    throw new Error(`Error al agregar variaciones: ${(error as Error).message}`);
  }
};