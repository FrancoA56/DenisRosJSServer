import { Router } from "express";
import addReviewToProduct from "../../controllers/review/addReviewToProduct"

const reviewRouter = Router();

router.use("/addReview", addReviewToProduct);


export default reviewRouter;
