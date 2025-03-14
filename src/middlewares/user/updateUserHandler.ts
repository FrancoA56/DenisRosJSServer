import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Expresión regular para validar el teléfono
const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const updateUserHandler = async (
  userId: number,
  userData: {
    firstName?: string;
    lastName?: string;
    phone?: string; 
    bday?: Date;    
    ciudad?: string;
    provincia?: string;
    direccion?: string;
    numeroDireccion?: string;
    codigoPostal?: string;
  }
) => {
  const {
    firstName,
    lastName,
    phone,
    bday,
    ciudad,
    provincia,
    direccion,
    numeroDireccion,
    codigoPostal,
  } = userData;

  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("No se encontró un usuario con el ID proporcionado.");
    }

    // Validar el teléfono (si se proporciona)
    if (phone && !phoneRegex.test(phone)) {
      throw new Error("El número de teléfono no tiene un formato válido.");
    }

    // Validar la fecha de cumpleaños (si se proporciona)
    let formattedBday: Date | undefined;
    if (bday) {
      // Convertir la fecha a formato YYYY-MM-DD (sin hora)
      const dateOnly = new Date(bday);
      dateOnly.setHours(0, 0, 0, 0); // Truncar la hora
      formattedBday = dateOnly;
    }

    // Actualizar los datos del usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || existingUser.firstName,
        lastName: lastName || existingUser.lastName,
        phone: phone || existingUser.phone,
        bday: formattedBday || existingUser.bday,
        ciudad: ciudad || existingUser.ciudad,
        provincia: provincia || existingUser.provincia,
        direccion: direccion || existingUser.direccion,
        numeroDireccion: numeroDireccion || existingUser.numeroDireccion,
        codigoPostal: codigoPostal || existingUser.codigoPostal,
      },
    });

    // No devolver la contraseña hasheada por seguridad
    const { passwordHashed: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};