import { Router } from "express";
import addBrandController from "../../controllers/brand/addBrandController";
import updateBrandController from "../../controllers/brand/updateBrandController";
import toggleBrandStatusController from "../../controllers/brand/toggleBrandStatusController";
import deleteBrandController from "../../controllers/brand/deleteBrandController";
import getBrandByIdController from "../../controllers/brand/getBrandByIdController";
import getAllBrandsController from "../../controllers/brand/getAllBrandsController";

const brandRouter = Router();

brandRouter.post("/", addBrandController);
brandRouter.put("/:id", updateBrandController);
brandRouter.put("/toggle/:id", toggleBrandStatusController);
brandRouter.delete("/:id", deleteBrandController);
brandRouter.use("/:id", getBrandByIdController);
brandRouter.use("/", getAllBrandsController);

export default brandRouter;
