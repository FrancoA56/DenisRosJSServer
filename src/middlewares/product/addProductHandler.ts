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
    length,
    width,
    height,
    weight,
    isDisabled,
  } = productData;

  if (!name || !sku) {
    throw new Error(
      "Se necesitan los campos nombre y sku para crear el producto."
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
        gallery,
        variations: {
          create: variations,
        },
        discount: discount
          ? {
              create: discount,
            }
          : undefined,
        length,
        width,
        height,
        weight,
        isDisabled: isDisabled ?? false,
      },
    });

    return newProduct;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
