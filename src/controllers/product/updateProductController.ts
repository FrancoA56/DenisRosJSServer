import { Request, Response } from "express";
import { updateProductHandler } from "../../middlewares/product/updateProductHandler";

const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productData = req.body;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del producto para actualizarlo." });
      return;
    }

    const updatedProduct = await updateProductHandler(parseInt(id), productData);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateProductController;