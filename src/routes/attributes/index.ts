import { Router } from "express";
import createAttributeController from "../../controllers/attributes/createAttributeController";
import createOptionAttributeController from "../../controllers/attributes/createOptionAttributeController";
import getAllAttributesController from "../../controllers/attributes/getAllAttributesController";
import getAttributeByIdController from "../../controllers/attributes/getAttributeByIdController";

const attributeRouter = Router();

attributeRouter.post("/", createAttributeController);
attributeRouter.get("/", getAllAttributesController);
attributeRouter.get("/:id", getAttributeByIdController);
attributeRouter.put("/options/:id", createOptionAttributeController);


export default attributeRouter;
