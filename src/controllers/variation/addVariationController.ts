import { Request, Response } from "express";
import { addVariationHandler } from "../../middlewares/variation/addVariationHandler";

const addVariationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, type, code, name, imageUrl, price, length, width, height, weight } = req.body;

    // Validar campos obligatorios
    if (!productId || !type || !code || !name || !price) {
      res.status(400).json({ error: "Faltan campos obligatorios para crear la variación." });
      return;
    }

    // Llamar al handler para crear la variación
    const variation = await addVariationHandler({
      productId,
      type,
      code,
      name,
      imageUrl,
      price,
      length,
      width,
      height,
      weight,
    });

    // Devolver la variación creada
    res.status(201).json(variation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addVariationController;