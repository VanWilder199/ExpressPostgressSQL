import { Router } from "express";
import { UserController } from "../controllers/userController";

import { UserSchema } from "../validator/users.schema";
import { usersValidators } from "../validator/users.validators";
import { PgUsersService } from "../services/pg-users.service";

const usersRouter = Router();

const storageService = new PgUsersService();
const controllerUser = new UserController(storageService);

usersRouter.get(
  "/users",

  controllerUser.getAll.bind(controllerUser)
);

usersRouter.post(
  "/users",

  usersValidators.body(UserSchema),
  controllerUser.create.bind(controllerUser)
);

usersRouter.get(
  "/users/:id",

  controllerUser.getById.bind(controllerUser)
);

usersRouter.put(
  "/users/:id",

  usersValidators.body(UserSchema),
  controllerUser.updateData.bind(controllerUser)
);

usersRouter.delete(
  "/users/:id",

  controllerUser.deleteData.bind(controllerUser)
);

export default usersRouter;
