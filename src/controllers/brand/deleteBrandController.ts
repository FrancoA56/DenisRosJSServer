import { Request, Response } from "express";
import { deleteBrandHandler } from "../../middlewares/brand/deleteBrandHandler";

const deleteBrandController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se necesita el ID de la marca para realizar esta acción." });
      return;
    }

    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      res.status(400).json({ error: "El ID de la marca debe ser un número válido." });
      return;
    }

    await deleteBrandHandler(brandId);

    res.status(204).send(); // 204 No Content (éxito sin cuerpo de respuesta)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default deleteBrandController;