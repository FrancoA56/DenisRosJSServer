import { Request, Response } from "express";
import { getAllUsersHandler } from "../../middlewares/user/getAllUsersHandler";

const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extraer parámetros de ordenamiento de la query
    const { orderBy = "id", orderDirection = "asc" } = req.query;

    // Validar el orden (solo ascendente o descendente)
    const validDirections = ["asc", "desc"];
    if (!validDirections.includes(orderDirection as string)) {
      res.status(400).json({ error: "El orden debe ser 'asc' o 'desc'." });
      return;
    }

    const users = await getAllUsersHandler(orderBy as string, orderDirection as "asc" | "desc");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllUsersController;
