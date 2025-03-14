import { Request, Response } from "express";
import { deleteProductHandler } from "../../middlewares/product/deleteProductHandler";

const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID del producto para eliminarlo." });
      return;
    }

    await deleteProductHandler(parseInt(id));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default deleteProductController;