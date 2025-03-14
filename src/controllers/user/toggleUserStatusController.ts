import { Request, Response } from "express";
import { toggleUserStatusHandler } from "../../middlewares/user/toggleUserStatusHandler";

const toggleUserStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del usuario para realizar esta acción." });
      return;
    }

    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "El ID del usuario debe ser un número válido." });
      return;
    }

    const updatedUser = await toggleUserStatusHandler(userId);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default toggleUserStatusController;