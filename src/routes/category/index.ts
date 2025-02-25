import { Router } from "express";
import addCategoryController from "../../controllers/category/addCategoryController";
import editCategoryController from "../../controllers/category/editCategoryController";
import getCategoryController from "../../controllers/category/getCategoryController";
import disableCategoryController from "../../controllers/category/disableCategoryController";
import deleteCategoryController from "../../controllers/category/deleteCategoryController";
import unDisableCategoryController from "../../controllers/category/unDisableCategoryController";

const categoryRouter = Router();

categoryRouter.post("/", addCategoryController);
categoryRouter.put("/:id", editCategoryController);
categoryRouter.get("/:id?", getCategoryController);
categoryRouter.put("/disable/:id", disableCategoryController);
categoryRouter.put("/undisable/:id", unDisableCategoryController);
categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
