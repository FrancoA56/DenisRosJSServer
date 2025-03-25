import { Request, Response } from "express";
import { createAttributeHandler } from "../../middlewares/attribute/createAttributeHandler";

const createAttributeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, options } = req.body;

    if (!name) {
      res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
      return;
    }

    const attribute = await createAttributeHandler({
      name,
      description,
      options
    });

    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default createAttributeController;