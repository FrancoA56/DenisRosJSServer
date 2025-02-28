import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtener el userId del token JWT (agregado por el middleware authenticateToken)
    const userId = (req as any).user?.userId; // Usar una aserción de tipo

    if (!userId) {
      res.status(401).json({ error: "Usuario no autenticado." });
      return;
    }

    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        ciudad: true,
        provincia: true,
        direccion: true,
        numeroDireccion: true,
        codigoPostal: true,
        isDisabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    // Devolver la información del perfil del usuario
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};