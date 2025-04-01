import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductBaseData {
  name: string;
  sku: string;
  shortDesc: string;
  longDesc: string;
  categoryId?: number;
  brandId?: number;
  tags?: string[];
  gallery?: string[];
  basePrice: number;
  baseWeight?: number;
  baseLength?: number;
  baseWidth?: number;
  baseHeight?: number;
  isDisabled?: boolean;
}

export const addProductHandler = async (productData: ProductBaseData) => {
  const {
    name,
    sku,
    shortDesc,
    longDesc,
    categoryId,
    brandId,
    gallery = [],
    tags,
    basePrice,
    baseWeight,
    baseLength,
    baseWidth,
    baseHeight,
    isDisabled = false,
  } = productData;

  if (!name || !sku || basePrice === undefined) {
    throw new Error(
      "Se necesitan los campos nombre, sku y basePrice para crear el producto."
    );
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        shortDesc,
        longDesc,
        categoryId,
        brandId,
        tags: productData.tags || [],
        gallery,
        basePrice,
        baseWeight,
        baseLength,
        baseWidth,
        baseHeight,
        isDisabled,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return newProduct;
  } catch (error) {
    throw new Error(`Error al crear el producto: ${(error as Error).message}`);
  }
};
