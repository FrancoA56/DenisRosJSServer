import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBrandByIdHandler = async (brandId: number) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    return brand;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};