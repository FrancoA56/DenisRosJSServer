import { Router } from "express";
import registerUserController from "../../controllers/user/registerUserController";
import loginUserController from "../../controllers/user/loginUserController";
import { getProfileController } from "../../controllers/user/getProfileController";
import { authenticateToken } from "../../middlewares/user/authenticateToken";
import updateUserController from "../../controllers/user/updateUserController";
import toggleUserStatusController from "../../controllers/user/toggleUserStatusController";
import updateUserRoleController from "../../controllers/user/updateUserRoleController";
import getAllUsersController from "../../controllers/user/getAllUsersController";
import deleteUserController from "../../controllers/user/deleteUserController";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/", getAllUsersController);
userRouter.get("/profile", authenticateToken, getProfileController);
userRouter.put("/:id", updateUserController);
userRouter.put("/toggle/:id", toggleUserStatusController);
userRouter.put("/role/:id", updateUserRoleController);
userRouter.delete("/delete/:id", deleteUserController);


export default userRouter;
