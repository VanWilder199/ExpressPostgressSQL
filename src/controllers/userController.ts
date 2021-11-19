import { Request, Response } from "express";
import { StatusCodes } from "../common";
import { IUser } from "../model/user";
import { ValidatedRequest } from "express-joi-validation";
import { RequestSchema } from "../validator/users.validators";
import { PgUsersService } from "../services/pg-users.service";
import { MAX_USERS_PER_PAGE } from "../app.constants";
import timeLogger from "../decorators/timeLogger.decorator";
import ControllerLogger from "../decorators/controllerLogger.decorator";

export class UserController {
  constructor(private userStorage: PgUsersService) {}

  @timeLogger
  @ControllerLogger
  async deleteData(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(StatusCodes.BADREQUEST);
    }

    const isDeleted = await this.userStorage.delete(id);

    if (isDeleted) {
      res.status(StatusCodes.OK);
      res.send("Deleted");
    }
  }

  @timeLogger
  @ControllerLogger
  async getAll(req: Request, res: Response): Promise<void> {
    const data = req.query;
    const limitUsers = data.limit ? Number(data.limit) : MAX_USERS_PER_PAGE;
    const loginSubString = data.loginSubstring
      ? String(data.loginSubstring)
      : undefined;

    const findUsers = await this.userStorage.findBySubstringAndLimit(
      loginSubString,
      limitUsers
    );
    res.status(StatusCodes.OK);
    res.send(findUsers);
  }

  @timeLogger
  @ControllerLogger
  async create(
    req: ValidatedRequest<RequestSchema>,
    res: Response
  ): Promise<void> {
    const data = req.body as IUser;
    const isUniqueLogin = await this.userStorage.checkUnique(data.login);

    if (isUniqueLogin) {
      res.status(StatusCodes.BADREQUEST);
      res.send("UserEntity already exists");
    } else {
      const user: IUser = {
        login: data.login,
        password: data.password,
        age: data.age,
        isDeleted: false,
      };

      const userEntity = await this.userStorage.create(user);
      res.status(StatusCodes.CREATED);
      res.send(userEntity);
    }
  }

  @timeLogger
  @ControllerLogger
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(StatusCodes.BADREQUEST);
      }
      const user = await this.userStorage.findById(id);

      res.json(user);
    } catch (error) {
      res.status(StatusCodes.BADREQUEST).send(error);
    }
  }

  @timeLogger
  @ControllerLogger
  async updateData(
    req: ValidatedRequest<RequestSchema>,
    res: Response
  ): Promise<void> {
    try {
      const body: IUser = req.body;
      const { id } = req.params;
      const updatedUser = await this.userStorage.update(body, id);
      if (!updatedUser) {
        res.sendStatus(StatusCodes.BADREQUEST);
      }
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      res.status(StatusCodes.BADREQUEST).send(error);
    }
  }
}
