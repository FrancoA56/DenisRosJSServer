import { Router } from "express";
import registerUserController from "../../controllers/user/registerUserController";
import loginUserController from "../../controllers/user/loginUserController";
import { getProfileController } from "../../controllers/user/getProfileController";
import { authenticateToken } from "../../middlewares/user/authenticateToken";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/profile", authenticateToken, getProfileController);


export default userRouter;