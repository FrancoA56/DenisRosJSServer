import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

enum Role {
  CLIENTE = "CLIENTE",
  GESTOR = "GESTOR",
  ADMIN = "ADMIN",
}

export const registerUserHandler = async (userData: {
  email: string;
  password: string;
  role?: Role; // Nuevo campo: Rol del usuario (opcional)
}) => {
  const { email, password, role } = userData;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(
        "Ya existe un usuario registrado con este correo electrónico."
      );
    }

    // Hashear la contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHashed,
        role: role || "CLIENTE", // Asignar el rol (por defecto: "cliente")
      },
    });

    // No devolver la contraseña hasheada por seguridad
    const { passwordHashed: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
