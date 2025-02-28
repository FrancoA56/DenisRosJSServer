import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUserHandler = async (userData: {
  email: string;
  password: string;
}) => {
  const { email, password } = userData;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Ya existe un usuario registrado con este correo electrónico.");
    }

    // Hashear la contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHashed,
      },
    });

    // No devolver la contraseña hasheada por seguridad
    const { passwordHashed: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};