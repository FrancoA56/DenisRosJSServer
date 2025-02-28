import { Request, Response } from "express";
import { getBrandByIdHandler } from "../../middlewares/brand/getBrandByIdHandler";

const getBrandByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la marca para realizar esta acción." });
      return;
    }

    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      res.status(400).json({ error: "El ID de la marca debe ser un número válido." });
      return;
    }

    const brand = await getBrandByIdHandler(brandId);

    if (!brand) {
      res.status(404).json({ error: "No se encontró una marca con el ID proporcionado." });
      return;
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getBrandByIdController;