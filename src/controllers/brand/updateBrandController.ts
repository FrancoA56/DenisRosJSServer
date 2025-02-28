import { Request, Response } from "express";
import { updateBrandHandler } from "../../middlewares/brand/updateBrandHandler";

const updateBrandController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, logo }: { name?: string; logo?: string } = req.body;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la marca para realizar esta acción." });
      return;
    }

    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      res.status(400).json({ error: "El ID de la marca debe ser un número válido." });
      return;
    }

    // Verificar que al menos uno de los campos (name o logo) esté presente
    if (!name && !logo) {
      res.status(400).json({ error: "Se necesita proporcionar al menos un campo (nombre o logo) para actualizar la marca." });
      return;
    }

    const updatedBrand = await updateBrandHandler(brandId, { name, logo });

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default updateBrandController;