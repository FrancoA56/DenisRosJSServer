import { Request, Response } from "express";
import { getAllAttributesHandler } from "../../middlewares/attribute/getAllAttributesHandler";

const getAllAttributesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const attributes = await getAllAttributesHandler();
    res.status(200).json(attributes);
  } catch (error) {
    console.error("Error en getAllAttributesController:", error);
    res.status(500).json({ 
      error: (error as Error).message || "Error interno al obtener atributos" 
    });
  }
};

export default getAllAttributesController;