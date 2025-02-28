import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBrandHandler = async (brandData: {
  name: string;
  logo?: string;
  isDisable?: boolean;
}) => {
  const { name, logo, isDisable } = brandData;

  if (!name) {
    throw new Error("Se necesita completar el campo nombre para crear la marca.");
  }

  try {
    // Verificar si la marca ya existe
    const existingBrand = await prisma.brand.findUnique({
      where: { name },
    });

    if (existingBrand) {
      throw new Error("Ya existe una marca con este nombre.");
    }

    // Crear la marca en la base de datos con Prisma
    const newBrand = await prisma.brand.create({
      data: {
        name,
        logo: logo || null, // Si no se proporciona un logo, se guarda como null
        isDisabled: isDisable ?? false, // Valor por defecto si no se envía
      },
    });

    return newBrand;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};