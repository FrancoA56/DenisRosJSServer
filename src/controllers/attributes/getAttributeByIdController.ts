import { Request, Response } from "express";
import { getAttributeByIdHandler } from "../../middlewares/attribute/getAttributeByIdHandler";

const getAttributeByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Se requiere el ID del atributo" });
      return;
    }

    const attributeId = parseInt(id);
    if (isNaN(attributeId)) {
      res.status(400).json({ error: "ID de atributo inválido" });
      return;
    }

    const attribute = await getAttributeByIdHandler(attributeId);
    
    if (!attribute) {
      res.status(404).json({ error: "Atributo no encontrado" });
      return;
    }

    res.status(200).json(attribute);
  } catch (error) {
    console.error("Error en getAttributeByIdController:", error);
    res.status(500).json({ 
      error: (error as Error).message || "Error interno al obtener el atributo" 
    });
  }
};

export default getAttributeByIdController;