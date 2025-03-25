import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AttributeAssignment {
  attributeId: number;
  isRequired: boolean;
}

// assignAttributesHandler.ts
export const assignAttributesHandler = async (productId: number, attributes: AttributeAssignment[]) => {
  try {
    // Validación adicional de los IDs
    if (!productId || isNaN(productId)) {
      throw new Error("ID de producto inválido");
    }

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error("Se requiere un array válido de atributos");
    }

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true } // Solo necesitamos verificar que existe
    });

    if (!product) {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }

    // Verificar que los atributos existen
    const attributeIds = attributes.map(attr => attr.attributeId);
    const existingAttributes = await prisma.attribute.findMany({
      where: { id: { in: attributeIds } },
      select: { id: true }
    });

    if (existingAttributes.length !== attributeIds.length) {
      const missingIds = attributeIds.filter(id => 
        !existingAttributes.some(attr => attr.id === id)
      );
      throw new Error(`Los siguientes IDs de atributo no existen: ${missingIds.join(', ')}`);
    }

    // Asignar atributos al producto
    const assignments = await prisma.$transaction(
      attributes.map(attr =>
        prisma.productAttribute.create({
          data: {
            productId,
            attributeId: attr.attributeId,
            isRequired: attr.isRequired,
          },
          include: {
            attribute: {
              include: {
                options: true,
              },
            },
          },
        })
      )
    );

    return assignments;
  } catch (error) {
    console.error("Error en assignAttributesHandler:", error);
    throw new Error(`Error al asignar atributos: ${(error as Error).message}`);
  }
};