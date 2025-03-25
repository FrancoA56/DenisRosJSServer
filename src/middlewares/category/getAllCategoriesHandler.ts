import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GetCategoriesOptions = {
  includeDisabled: boolean;
  sortBy: 'id' | 'name';
  sortOrder: 'asc' | 'desc';
  filterStatus: 'all' | 'enabled' | 'disabled';
};

export const getAllCategoriesHandler = async (options: GetCategoriesOptions) => {
  try {
    // Determinar el filtro de estado
    let statusFilter = {};
    if (options.filterStatus === 'enabled') {
      statusFilter = { isDisabled: false };
    } else if (options.filterStatus === 'disabled') {
      statusFilter = { isDisabled: true };
    } else if (!options.includeDisabled) {
      // Fallback para compatibilidad con versiones anteriores
      statusFilter = { isDisabled: false };
    }

    const categories = await prisma.category.findMany({
      where: statusFilter,
      orderBy: {
        [options.sortBy]: options.sortOrder
      },
    });

    return categories;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};