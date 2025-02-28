import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: "Token de autenticación no proporcionado." });
    return; // No devolver un valor explícitamente
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
    if (err) {
      res.status(403).json({ error: "Token inválido o expirado." });
      return; // No devolver un valor explícitamente
    }

    // Agregar el usuario al objeto `req` para que esté disponible en los controladores
    (req as any).user = user as { userId: number; email: string }; // Asegurar el tipo
    next(); // Llamar a next() para continuar con el siguiente middleware o controlador
  });
};