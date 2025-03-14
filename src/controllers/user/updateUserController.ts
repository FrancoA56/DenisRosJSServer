import { Request, Response } from "express";
import { updateUserHandler } from "../../middlewares/user/updateUserHandler";

const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      ciudad,
      phone,
      bday,
      provincia,
      direccion,
      numeroDireccion,
      codigoPostal,
    } = req.body;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del usuario para realizar esta acción." });
      return;
    }

    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "El ID del usuario debe ser un número válido." });
      return;
    }

    // Actualizar el usuario
    const updatedUser = await updateUserHandler(userId, {
      firstName,
      lastName,
      ciudad,
      provincia,
      direccion,
      phone,
      bday,
      numeroDireccion,
      codigoPostal,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateUserController;