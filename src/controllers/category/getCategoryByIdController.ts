import { Request, Response } from "express";
import { getCategoryByIdHandler } from "../../middlewares/category/getCategoryByIdHandler";

const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la categoría." });
      return;
    }

    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      res.status(400).json({ error: "El ID de la categoría debe ser un número válido." });
      return;
    }

    const category = await getCategoryByIdHandler(categoryId);

    if (!category) {
      res.status(404).json({ error: "No se encontró una categoría con el ID proporcionado." });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getCategoryByIdController;