import { Request, Response } from "express";
import { getAllCategoriesHandler } from "../../middlewares/category/getAllCategoriesHandler";

const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeDisabled } = req.query;

    // Convertir el query parameter a booleano
    const includeDisabledBool = includeDisabled === "true";

    const categories = await getAllCategoriesHandler(includeDisabledBool);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllCategoriesController;