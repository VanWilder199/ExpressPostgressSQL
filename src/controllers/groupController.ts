import { GroupService } from "../services/group.service";
import { Request, Response } from "express";
import { StatusCodes } from "../common";
import { ValidatedRequest } from "express-joi-validation";
import { RequestGroupSchema } from "../validator/group.validators";
import { IGroupModel } from "../model/group.model";
import { RequestSchema } from "../validator/users.validators";
import timeLogger from "../decorators/timeLogger.decorator";
import ControllerLogger from "../decorators/controllerLogger.decorator";

export class GroupController {
  constructor(private groupService: GroupService) {}

  @timeLogger
  @ControllerLogger
  async getAll(req: Request, res: Response): Promise<void> {
    const groups = await this.groupService.getAll();
    res.status(StatusCodes.OK).send(groups);
  }

  @timeLogger
  @ControllerLogger
  async create(
    req: ValidatedRequest<RequestGroupSchema>,
    res: Response
  ): Promise<void> {
    const data = req.body as IGroupModel;

    const isUniqueGroup = await this.groupService.checkUnique(data.name);

    if (isUniqueGroup) {
      res.status(StatusCodes.BADREQUEST);
      res.send("Group entity already exists");
    } else {
      const group: IGroupModel = {
        name: data.name,
        permissions: data.permissions,
      };
      const groupEntity = await this.groupService.create(group);
      res.status(StatusCodes.CREATED).send(groupEntity);
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

      const group = await this.groupService.findById(id);

      res.send(group);
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
      const body: IGroupModel = req.body;
      const { id } = req.params;

      if (body.idsUsers) {
        await this.groupService.addUsersToGroup(id, body.idsUsers);
      } else {
        await this.groupService.update(body, id);
      }
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      res.status(StatusCodes.BADREQUEST).send(error);
    }
  }

  @timeLogger
  @ControllerLogger
  async deleteData(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(StatusCodes.BADREQUEST);
    }

    const isDeletedUserGroupAndGroup = await this.groupService.deleteGroup(id);

    if (isDeletedUserGroupAndGroup) {
      res.status(StatusCodes.OK);
      res.send("Deleted");
    }
  }
}
