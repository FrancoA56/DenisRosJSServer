
import { Request, Response } from "express";
import { deleteCategoryHandler } from "../../middlewares/category/deleteCategoryHandler";

const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
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

    await deleteCategoryHandler(categoryId);

    res.status(204).send(); // 204 No Content (éxito sin cuerpo de respuesta)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default deleteCategoryController;