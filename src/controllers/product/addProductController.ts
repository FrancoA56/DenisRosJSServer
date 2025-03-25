import { Request, Response } from "express";
import { addProductHandler } from "../../middlewares/product/addProductHandler";

const addProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    // Validación básica
    if (!productData.name || !productData.sku) {
      res.status(400).json({ error: "Se necesitan los campos nombre y sku para crear el producto." });
      return;
    }

    // Eliminamos variaciones del payload si vienen (ahora se hará en otro paso)
    const { variations, ...productBaseData } = productData;

    const product = await addProductHandler(productBaseData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addProductController;