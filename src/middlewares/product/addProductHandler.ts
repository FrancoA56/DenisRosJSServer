import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProductHandler = async (productData: any) => {
  const {
    name,
    sku,
    shortDesc,
    longDesc,
    categoryId,
    brandId,
    gallery,
    variations,
    discount,
    length: productLength,
    width: productWidth,
    height: productHeight,
    weight: productWeight,
    isDisabled,
  } = productData;

  if (!name || !sku) {
    throw new Error(
      "Se necesitan los campos nombre y sku para crear el producto."
    );
  }

  try {
    // Asignar medidas del producto a las variaciones si no se proporcionan
    const variationsWithDefaults = variations.map((variation: any) => ({
      ...variation,
      length: variation.length ?? productLength, // Usar medidas de la variación o las del producto
      width: variation.width ?? productWidth,
      height: variation.height ?? productHeight,
      weight: variation.weight ?? productWeight,
    }));

    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        shortDesc,
        longDesc,
        categoryId,
        brandId,
        gallery,
        variations: {
          create: variationsWithDefaults,
        },
        discount: discount
          ? {
              create: discount,
            }
          : undefined,
        length: productLength,
        width: productWidth,
        height: productHeight,
        weight: productWeight,
        isDisabled: isDisabled ?? false,
      },
    });

    return newProduct;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
