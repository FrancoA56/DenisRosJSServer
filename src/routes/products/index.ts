import { Router } from "express";
import addProductController from "../../controllers/product/addProductController";
import updateProductController from "../../controllers/product/updateProductController";
import getAllProductsController from "../../controllers/product/getAllProductsController";
import getProductByIdController from "../../controllers/product/getProductByIdController";
import deleteProductController from "../../controllers/product/deleteProductController";
import toggleProductStatusController from "../../controllers/product/toggleProductStatusController ";

const productRouter = Router();

productRouter.post("/", addProductController);
productRouter.put("/:id", updateProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.get("/", getAllProductsController);
productRouter.put("/toggle/:id", toggleProductStatusController);
productRouter.delete("/:id", deleteProductController);

export default productRouter;