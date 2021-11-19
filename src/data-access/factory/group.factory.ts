import { define } from "typeorm-seeding";
import { GroupEntity } from "../entity/Group.entity";
import * as faker from "faker";

define(GroupEntity, () => {
  const group = new GroupEntity();
  group.id = faker.random.uuid();
  group.name = "";
  group.permissions = [];
  return group;
});
