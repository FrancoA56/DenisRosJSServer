import { Request, Response } from "express";
import { getAllProductsHandler } from "../../middlewares/product/getAllProductsHandler";

const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extraer parámetros de consulta
    const { 
      sortBy, 
      sortOrder, 
      category, 
      brand, 
      isDisabled, 
      search,
      page, // Nuevo: Número de página
      pageSize // Nuevo: Tamaño de la página
    } = req.query;

    // Convertir parámetros a tipos correctos
    const filters = {
      category: category ? parseInt(category as string) : undefined,
      brand: brand ? parseInt(brand as string) : undefined,
      isDisabled: isDisabled ? isDisabled === 'true' : undefined,
      search: search as string | undefined,
    };

    const sorting = {
      sortBy: sortBy as string | undefined,
      sortOrder: sortOrder as 'asc' | 'desc' | undefined,
    };

    const pagination = {
      page: page ? parseInt(page as string) : 1, // Página por defecto: 1
      pageSize: pageSize ? parseInt(pageSize as string) : 18, // Tamaño por defecto: 18
    };

    // Llamar al handler con los filtros, ordenamiento y paginación
    const { products, total } = await getAllProductsHandler(filters, sorting, pagination);

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / pagination.pageSize);

    // Respuesta con paginación
    res.status(200).json({
      products,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllProductsController;