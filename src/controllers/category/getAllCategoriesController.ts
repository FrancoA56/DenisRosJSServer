import { Request, Response } from "express";
import { getAllCategoriesHandler } from "../../middlewares/category/getAllCategoriesHandler";

const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      includeDisabled,
      sortBy,
      sortOrder,
      filterStatus
    } = req.query;

    // Convertir y validar parámetros
    const includeDisabledBool = includeDisabled === "true";
    
    // Validar sortBy
    const validatedSortBy = sortBy === 'name' ? 'name' : 'id';
    
    // Validar sortOrder
    const validatedSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';
    
    // Validar filterStatus
    let validatedFilterStatus: 'all' | 'enabled' | 'disabled' = 'all';
    if (filterStatus === 'enabled' || filterStatus === 'disabled') {
      validatedFilterStatus = filterStatus;
    }

    const categories = await getAllCategoriesHandler({
      includeDisabled: includeDisabledBool,
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
      filterStatus: validatedFilterStatus
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllCategoriesController;