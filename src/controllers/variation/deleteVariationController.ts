import { Request, Response } from "express";
import { deleteVariationHandler } from "../../middlewares/variation/deleteVariationHandler";

const deleteVariationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID esté presente
    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la variación." });
      return;
    }

    // Llamar al handler para eliminar la variación
    await deleteVariationHandler(parseInt(id));

    // Devolver una respuesta exitosa sin contenido
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default deleteVariationController;