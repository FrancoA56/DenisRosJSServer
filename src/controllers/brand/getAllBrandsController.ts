import { Request, Response } from "express";
import { getAllBrandsHandler } from "../../middlewares/brand/getAllBrandsHandler";

const getAllBrandsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeDisabled } = req.query;

    // Convertir el query parameter a booleano
    const includeDisabledBool = includeDisabled === "true";

    const brands = await getAllBrandsHandler(includeDisabledBool);

    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllBrandsController;