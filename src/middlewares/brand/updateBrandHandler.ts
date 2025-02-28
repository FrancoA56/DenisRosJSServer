import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateBrandHandler = async (
  brandId: number,
  brandData: { name?: string; logo?: string }
) => {
  const { name, logo } = brandData;

  try {
    // Verificar si la marca existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!existingBrand) {
      throw new Error("No se encontró una marca con el ID proporcionado.");
    }

    // Verificar si el nuevo nombre ya existe en otra marca
    if (name) {
      const brandWithSameName = await prisma.brand.findUnique({
        where: { name },
      });

      if (brandWithSameName && brandWithSameName.id !== brandId) {
        throw new Error("Ya existe una marca con este nombre.");
      }
    }

    // Actualizar la marca
    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        name: name || existingBrand.name, // Si no se proporciona un nombre, se mantiene el existente
        logo: logo || existingBrand.logo, // Si no se proporciona un logo, se mantiene el existente
      },
    });

    return updatedBrand;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};