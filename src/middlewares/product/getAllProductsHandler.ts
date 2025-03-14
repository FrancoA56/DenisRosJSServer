import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Filters {
  category?: number;
  brand?: number;
  isDisabled?: boolean;
  search?: string;
}

interface Sorting {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface Pagination {
  page: number;
  pageSize: number;
}

export const getAllProductsHandler = async (
  filters: Filters,
  sorting: Sorting,
  pagination: Pagination
) => {
  try {
    // Construir el objeto "where" para los filtros
    const where: any = {};

    if (filters.category) {
      where.categoryId = filters.category;
    }

    if (filters.brand) {
      where.brandId = filters.brand;
    }

    if (filters.isDisabled !== undefined) {
      where.isDisabled = filters.isDisabled;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
        { shortDesc: { contains: filters.search, mode: 'insensitive' } },
        { longDesc: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Construir el objeto "orderBy" para el ordenamiento
    const orderBy: any = {};

    if (sorting.sortBy && sorting.sortOrder) {
      orderBy[sorting.sortBy] = sorting.sortOrder;
    }

    // Calcular el "skip" y "take" para la paginación
    const skip = (pagination.page - 1) * pagination.pageSize;
    const take = pagination.pageSize;

    // Realizar la consulta con Prisma
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: true,
          brand: true,
          variations: true,
          discount: true,
        },
      }),
      prisma.product.count({ where }), // Obtener el total de productos (para calcular el total de páginas)
    ]);

    return { products, total };
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};