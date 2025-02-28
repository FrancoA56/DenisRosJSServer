import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBrandsHandler = async (includeDisabled: boolean = false) => {
  try {
    const brands = await prisma.brand.findMany({
      where: includeDisabled ? {} : { isDisabled: false }, // Filtro condicional
      orderBy: {
        name: "asc", // Ordenar alfabéticamente por nombre
      },
    });

    return brands;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
