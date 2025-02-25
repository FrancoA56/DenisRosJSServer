import { Router } from "express";
import addCategoryController from "../../controllers/category/addCategoryController";
import updateCategoryNameController from "../../controllers/category/updateCategoryNameController ";
import getAllCategoriesController  from "../../controllers/category/getAllCategoriesController";
import toggleCategoryStatusController from "../../controllers/category/toggleCategoryStatusController ";
import getCategoryByIdController from "../../controllers/category/getCategoryByIdController";
import deleteCategoryController from "../../controllers/category/deleteCategoryController"
const categoryRouter = Router();

categoryRouter.post("/", addCategoryController);
categoryRouter.put("/:id", updateCategoryNameController);
categoryRouter.get("/:id", getCategoryByIdController);
categoryRouter.get("/", getAllCategoriesController);
categoryRouter.put("/toggle/:id", toggleCategoryStatusController);
categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
