import { PrismaClient } from "@prisma/client";
import { stat } from "fs";

const prisma = new PrismaClient();

type GetBrandOptions = {
  includeDisabled: boolean;
  sortBy: 'id' | 'name';
  sortOrder: 'asc' | 'desc';
  filterStatus: 'all' | 'enabled' | 'disabled';
};

export const getAllBrandsHandler = async (options: GetBrandOptions) => {
  try {
    let statusFilter = {};
    if (options.filterStatus === 'enabled') {
      statusFilter = { isDisabled: false };
    } else if (options.filterStatus === 'disabled') {
      statusFilter = { isDisabled: true };
    } else if (!options.includeDisabled) {
      // Fallback para compatibilidad con versiones anteriores
      statusFilter = { isDisabled: false };
    }

    const brands = await prisma.brand.findMany({
      where: statusFilter, // Filtro condicional
      orderBy: {
        [options.sortBy]: options.sortOrder // Ordenar alfabéticamente por nombre
      },
    });

    return brands;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${(error as Error).message}`);
  }
};
