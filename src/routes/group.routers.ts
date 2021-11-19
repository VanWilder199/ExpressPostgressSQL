import express from "express";
import { groupValidators } from "../validator/group.validators";
import { GroupService } from "../services/group.service";
import { GroupController } from "../controllers/groupController";
import { GroupSchema } from "../validator/group.schema";

const groupRouter = express.Router();

const storageService = new GroupService();
const groupController = new GroupController(storageService);

groupRouter.get("/groups", groupController.getAll.bind(groupController));

groupRouter.get("/groups/:id", groupController.getById.bind(groupController));

groupRouter.post(
  "/groups",

  groupValidators.body(GroupSchema),
  groupController.create.bind(groupController)
);

groupRouter.put(
  "/groups/:id",

  groupValidators.body(GroupSchema),
  groupController.updateData.bind(groupController)
);

groupRouter.delete(
  "/groups/:id",

  groupController.deleteData.bind(groupController)
);

export default groupRouter;
