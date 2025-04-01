import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllAttributesHandler = async () => {
  try {
    const attributes = await prisma.attribute.findMany({
      where: {
        isDisabled: false // Solo atributos activos
      },
      include: {
        options: {
          where: {
            isDisabled: false // Solo opciones activas
          },
          orderBy: {
            value: 'asc' // Orden alfabético
          }
        }
      },
      orderBy: {
        name: 'asc' // Orden alfabético
      }
    });

    return {
      success: true,
      count: attributes.length,
      data: attributes
    };
  } catch (error) {
    console.error("Error en getAllAttributesHandler:", error);
    throw new Error("Error al obtener los atributos");
  }
};