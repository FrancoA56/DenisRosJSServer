import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const loginUserHandler = async (userData: {
  email: string;
  password: string;
}) => {
  const { email, password } = userData;

  try {
    // Buscar al usuario por su correo electrónico
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("No se encontró un usuario con este correo electrónico.");
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.passwordHashed);

    if (!isPasswordValid) {
      throw new Error("La contraseña es incorrecta.");
    }

    // Generar un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload (datos que se incluirán en el token)
      process.env.JWT_SECRET || "secret_key", // Clave secreta para firmar el token
      { expiresIn: "1d" } // Tiempo de expiración del token
    );

    return token;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};