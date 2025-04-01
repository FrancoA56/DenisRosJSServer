import { Request, Response } from "express";
import { createOptionAttributeHandler } from "../../middlewares/attribute/createOptionAttributeHandler";

const createOptionAttributeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { options } = req.body;

    // Validaciones
    if (!id) {
      res.status(400).json({ 
        error: "Se necesita el ID del atributo para crear opciones" 
      });
      return;
    }

    if (!options || !Array.isArray(options) || options.length === 0) {
      res.status(400).json({ 
        error: "Se requiere un array de opciones válido" 
      });
      return;
    }

    const attributeIdNumber = parseInt(id);
    if (isNaN(attributeIdNumber)) {
      res.status(400).json({ 
        error: "ID de atributo inválido" 
      });
      return;
    }

    const attribute = await createOptionAttributeHandler(attributeIdNumber, options);
    res.status(201).json(attribute);
  } catch (error) {
    console.error("Error en createOptionAttributeController:", error);
    res.status(500).json({ 
      error: (error as Error).message || "Error interno del servidor" 
    });
  }
};

export default createOptionAttributeController;