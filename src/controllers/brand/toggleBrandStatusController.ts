import { Request, Response } from "express";
import { toggleBrandStatusHandler } from "../../middlewares/brand/toggleBrandStatusHandler";

const toggleBrandStatusController = async (req: Request, res: Response): Promise<void> => {
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

    const updatedBrand = await toggleBrandStatusHandler(brandId);

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default toggleBrandStatusController;