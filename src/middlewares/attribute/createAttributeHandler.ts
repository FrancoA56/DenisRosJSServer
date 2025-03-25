import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AttributeOptionData {
  value: string;
  code?: string;
}

interface CreateAttributeData {
  name: string;
  description?: string;
  options?: AttributeOptionData[];
}

export const createAttributeHandler = async (data: CreateAttributeData) => {
  const { name, description, options = [] } = data;

  try {
    return await prisma.$transaction(async (prisma) => {
      // Crear el atributo principal
      const attribute = await prisma.attribute.create({
        data: {
          name,
          description,
        }
      });

      // Crear las opciones del atributo si se proporcionaron
      if (options.length > 0) {
        const createdOptions = await Promise.all(
          options.map(option =>
            prisma.attributeOption.create({
              data: {
                attributeId: attribute.id,
                value: option.value,
                code: option.code || undefined,
              }
            })
        ));

        return {
          ...attribute,
          options: createdOptions
        };
      }

      return attribute;
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      throw new Error(`Ya existe un atributo con el nombre '${name}'`);
    }
    throw new Error(`Error al crear el atributo: ${(error as Error).message}`);
  }
};