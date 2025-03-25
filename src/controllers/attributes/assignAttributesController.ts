import { Request, Response } from "express";
import { assignAttributesHandler } from "../../middlewares/attribute/assignAttributesHandler";

const assignAttributesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { attributes } = req.body;

    if (!attributes || !Array.isArray(attributes)) {
      res.status(400).json({ error: "Se requiere un array de atributos." });
      return;
    }

    // Asegurar que productId es un número válido
    const productIdNumber = parseInt(productId, 10);
    if (isNaN(productIdNumber)) {
      res.status(400).json({ error: "ID de producto inválido" });
      return;
    }

    const result = await assignAttributesHandler(productIdNumber, attributes);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default assignAttributesController;
