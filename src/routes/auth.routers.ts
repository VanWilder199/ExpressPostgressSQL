import { Router } from "express";
import { authValidators } from "../validator/auth.validators";
import { AuthSchema } from "../validator/auth.schema";

import { AuthController } from "../controllers/authController";
import { PgUsersService } from "../services/pg-users.service";

const authRouter = Router();

const userService = new PgUsersService();
const authController = new AuthController(userService);

authRouter.post(
  "/login",
  authValidators.body(AuthSchema),
  authController.login.bind(authController)
);

export default authRouter;
