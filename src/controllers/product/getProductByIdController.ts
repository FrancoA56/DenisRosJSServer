import { Request, Response } from "express";
import { getProductByIdHandler } from "../../middlewares/product/getProductByIdHandler";

const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del producto para obtenerlo." });
      return;
    }

    const product = await getProductByIdHandler(parseInt(id));

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado." });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getProductByIdController;