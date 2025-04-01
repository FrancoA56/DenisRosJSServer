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
    // Validación básica mejorada
    if (!attributeId || attributeId <= 0) {
      throw new Error("ID de atributo inválido");
    }

    if (!options?.length) {
      throw new Error("Debe proporcionar al menos una opción");
    }

    // Normalizar opciones
    const normalizedOptions = options.map(opt => ({
      value: opt.value.trim(),
      code: opt.code?.trim() || null
    }));

    // Verificar atributo existe
    const attributeExists = await prisma.attribute.findUnique({
      where: { id: attributeId },
      select: { id: true }
    });

    if (!attributeExists) {
      throw new Error(`Atributo con ID ${attributeId} no encontrado`);
    }

    // Crear opciones
    const createdOptions = await prisma.$transaction(
      normalizedOptions.map(option =>
        prisma.attributeOption.create({
          data: {
            attributeId,
            value: option.value,
            code: option.code,
          }
        })
      )
    );

    return {
      success: true,
      attributeId,
      addedCount: createdOptions.length,
      options: createdOptions
    };
  } catch (error) {
    console.error("Error en createOptionAttributeHandler:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message.includes('Unique constraint')
        ? "Una o más opciones ya existen para este atributo"
        : error.message
      : "Error desconocido al crear opciones";
    
    throw new Error(errorMessage);
  }
};