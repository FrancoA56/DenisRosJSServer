import { Request, Response } from "express";
import { getVariationByIdHandler } from "../../middlewares/variation/getVariationByIdHandler";

const getVariationByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID esté presente
    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la variación." });
      return;
    }

    // Llamar al handler para obtener la variación
    const variation = await getVariationByIdHandler(parseInt(id));

    // Devolver la variación
    res.status(200).json(variation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getVariationByIdController;