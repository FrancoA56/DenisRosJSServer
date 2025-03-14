import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsersHandler = async (orderBy: string = "id", orderDirection: "asc" | "desc" = "asc") => {
  try {
    // Validar que el campo de ordenamiento sea permitido
    const validOrderByFields = ["id", "email", "lastName"];
    if (!validOrderByFields.includes(orderBy)) {
      throw new Error("El campo de ordenamiento no es válido. Usa 'id' o 'email'.");
    }

    // Obtener la lista de usuarios ordenados según los parámetros recibidos
    const users = await prisma.user.findMany({
      orderBy: {
        [orderBy]: orderDirection, // Orden dinámico
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        bday: true,
        ciudad: true,
        provincia: true,
        direccion: true,
        numeroDireccion: true,
        codigoPostal: true,
        role: true,
        isDisabled: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
  }
};
