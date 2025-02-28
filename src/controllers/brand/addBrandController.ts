import { Request, Response } from "express";
import { addBrandHandler } from "../../middlewares/brand/addBrandHandler";

const addBrandController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, logo, isDisable }: { name?: string; logo?: string; isDisable?: boolean } = req.body;

    if (!name) {
      res.status(400).json({ error: "Se necesita completar el campo nombre para crear la marca." });
      return;
    }

    const brand = await addBrandHandler({ name, logo, isDisable });

    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addBrandController;