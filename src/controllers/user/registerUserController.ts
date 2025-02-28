import { Request, Response } from "express";
import { registerUserHandler } from "../../middlewares/user/registerUserHandler";

const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      res
        .status(400)
        .json({
          error: "El correo electrónico y la contraseña son obligatorios.",
        });
      return;
    }

    // Registrar al usuario
    const newUser = await registerUserHandler({ email, password });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default registerUserController;
