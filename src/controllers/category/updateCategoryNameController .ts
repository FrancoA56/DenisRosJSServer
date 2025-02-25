import { Request, Response } from "express";
import { updateCategoryNameHandler } from "../../middlewares/category/updateCategoryNameHandler";

const updateCategoryNameController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la categoría para realizar esta acción." });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Se necesita proporcionar un nuevo nombre para la categoría." });
      return;
    }

    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      res.status(400).json({ error: "El ID de la categoría debe ser un número válido." });
      return;
    }

    const updatedCategory = await updateCategoryNameHandler(categoryId, name);

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateCategoryNameController;