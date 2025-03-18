import { Request, Response } from "express";
import { toggleProductStatusHandler } from "../../middlewares/product/toggleProductStatusHandler";

const toggleProductStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID esté presente
    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del producto." });
      return;
    }

    // Llamar al handler para alternar el estado del producto
    const updatedProduct = await toggleProductStatusHandler(parseInt(id));

    // Devolver el producto actualizado
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default toggleProductStatusController;