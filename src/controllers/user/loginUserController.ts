import { Request, Response } from "express";
import { loginUserHandler } from "../../middlewares/user/loginUserHandler";

const loginUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      res.status(400).json({ error: "El correo electrónico y la contraseña son obligatorios." });
      return;
    }

    // Iniciar sesión
    const token = await loginUserHandler({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default loginUserController;