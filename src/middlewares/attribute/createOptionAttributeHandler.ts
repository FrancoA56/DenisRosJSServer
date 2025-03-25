import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface OptionData {
  value: string;
  code?: string;
}

export const createOptionAttributeHandler = async (
  attributeId: number,
  options: OptionData[]
) => {
  try {
    // Validación adicional
    if (!attributeId || isNaN(attributeId)) {
      throw new Error("ID de atributo inválido");
    }

    if (!options || !Array.isArray(options) || options.length === 0) {
      throw new Error("Se requiere un array de opciones válido");
    }

    // Verificar que el atributo existe
    const attribute = await prisma.attribute.findUnique({
      where: { id: attributeId },
      select: { id: true }
    });

    if (!attribute) {
      throw new Error(`Atributo con ID ${attributeId} no encontrado`);
    }

    // Crear las opciones en una transacción
    const createdOptions = await prisma.$transaction(
      options.map(option =>
        prisma.attributeOption.create({
          data: {
            attributeId,
            value: option.value,
            code: option.code || null,
          },
          select: {
            id: true,
            value: true,
            code: true,
            attributeId: true,
          }
        })
      )
    );

    return {
      message: `${createdOptions.length} opción(es) creada(s) correctamente`,
      attributeId,
      options: createdOptions
    };
  } catch (error) {
    console.error("Error en createOptionAttributeHandler:", error);
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      throw new Error("Alguna de las opciones ya existe para este atributo");
    }
    
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Error desconocido al crear opciones de atributo"
    );
  }
};