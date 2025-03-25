import { Request, Response } from "express";
import { getAllBrandsHandler } from "../../middlewares/brand/getAllBrandsHandler";

const getAllBrandsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeDisabled,
      sortBy,
      sortOrder,
      filterStatus
     } = req.query;

    // Convertir el query parameter a booleano
    const includeDisabledBool = includeDisabled === "true";

    const validatedSortBy = sortBy === 'name' ? 'name' : 'id';

    const validatedSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';

    let validatedFilterStatus: 'all' | 'enabled' | 'disabled' = 'all';
    if (filterStatus === 'enabled' || filterStatus === 'disabled'){
      validatedFilterStatus = filterStatus
    }

    const brands = await getAllBrandsHandler({
      includeDisabled: includeDisabledBool,
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
      filterStatus: validatedFilterStatus
    });

    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllBrandsController;