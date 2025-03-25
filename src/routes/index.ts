import { Router } from "express";
// import productRouter from "./products";
import shopRouter from "./shop";
import userRouter from "./auth";
import reviewRouter from "./reviews";
import categoryRouter from "./category";
import brandRouter from "./brand";
import orderRouter from "./orders";
import paymentsRouter from "./payments";
import shippingRouter from "./shipping";
import variationRouter from "./variations";
import productRouter from "./products";
import attributeRouter from "./attributes"

const router = Router();

router.use("/product", productRouter);
// router.use("/shop", shopRouter);
router.use("/user", userRouter);
// router.use("/review", reviewRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/variation", variationRouter);
router.use("/attributes", attributeRouter)
// router.use("/order", orderRouter);
// router.use("/payments", paymentsRouter);
// router.use("/shipping", shippingRouter);

export default router;
