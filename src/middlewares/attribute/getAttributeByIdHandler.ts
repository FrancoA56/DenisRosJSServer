import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAttributeByIdHandler = async (attributeId: number) => {
  try {
    if (!attributeId || attributeId <= 0) {
      throw new Error("ID de atributo inválido");
    }

    const attribute = await prisma.attribute.findUnique({
      where: { 
        id: attributeId,
        isDisabled: false // Solo si está activo
      },
      include: {
        options: {
          where: {
            isDisabled: false // Solo opciones activas
          },
          orderBy: {
            value: 'asc'
          }
        }
      }
    });

    if (!attribute) {
      throw new Error("Atributo no encontrado");
    }

    return {
      success: true,
      data: attribute
    };
  } catch (error) {
    console.error("Error en getAttributeByIdHandler:", error);
    throw new Error(error instanceof Error ? error.message : "Error al obtener el atributo");
  }
};