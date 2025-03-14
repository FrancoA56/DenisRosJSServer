import { Router } from "express";
import addVariationController from "../../controllers/variation/addVariationController";
import updateVariationController from "../../controllers/variation/updateVariationController";
import deleteVariationController from "../../controllers/variation/deleteVariationController";

const variationRouter = Router();

variationRouter.post("/", addVariationController);
variationRouter.put("/:id", updateVariationController);
variationRouter.delete("/:id", deleteVariationController);

export default variationRouter;