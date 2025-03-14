import { Request, Response } from "express";
import { updateUserRoleHandler } from "../../middlewares/user/updateUserRoleHandler";

enum Role {
  CLIENTE = "CLIENTE",
  GESTOR = "GESTOR",
  ADMIN = "ADMIN",
}

const updateUserRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del usuario para realizar esta acción." });
      return;
    }

    if (!role) {
      res.status(400).json({ error: "Se necesita proporcionar un rol." });
      return;
    }

    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "El ID del usuario debe ser un número válido." });
      return;
    }

    // Validar que el rol proporcionado sea un valor válido del enum Role
    if (!Object.values(Role).includes(role)) {
      res.status(400).json({ error: "El rol proporcionado no es válido." });
      return;
    }

    const updatedUser = await updateUserRoleHandler(userId, role);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateUserRoleController;