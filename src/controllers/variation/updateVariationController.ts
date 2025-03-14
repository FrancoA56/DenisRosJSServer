import { Request, Response } from "express";
import { updateVariationHandler } from "../../middlewares/variation/updateVariationHandler";

const updateVariationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, code, name, imageUrl, price, length, width, height, weight } = req.body;

    // Validar que el ID esté presente
    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la variación." });
      return;
    }

    // Llamar al handler para actualizar la variación
    const updatedVariation = await updateVariationHandler(parseInt(id), {
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

    // Devolver la variación actualizada
    res.status(200).json(updatedVariation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateVariationController;