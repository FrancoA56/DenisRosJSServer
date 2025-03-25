import { Request, Response } from "express";
import { addVariationsHandler } from "../../middlewares/variation/addVariationsHandler";

const addVariationsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { variations } = req.body;

    if (!variations || !Array.isArray(variations)) {
      res.status(400).json({ error: "Se requiere un array de variaciones." });
      return;
    }

    const result = await addVariationsHandler(parseInt(productId), variations);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addVariationsController;