import { Router } from "express";
import createAttributeController from "../../controllers/attributes/createAttributeController";
import createOptionAttributeController from "../../controllers/attributes/createOptionAttributeController";

const attributeRouter = Router();

attributeRouter.post("/", createAttributeController);
attributeRouter.post("/options/:id", createAttributeController);


export default attributeRouter;
