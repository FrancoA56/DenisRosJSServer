import { Request, Response } from "express";
import { toggleCategoryStatusHandler } from "../../middlewares/category/toggleCategoryStatusHandler";

const toggleCategoryStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la categoría para realizar esta acción." });
      return;
    }

    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      res.status(400).json({ error: "El ID de la categoría debe ser un número válido." });
      return;
    }

    const updatedCategory = await toggleCategoryStatusHandler(categoryId);

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default toggleCategoryStatusController;
