import { Factory, Seeder } from "typeorm-seeding";
import { GroupEntity } from "../entity/Group.entity";
import { Permission } from "../../model/group.model";

export default class CreateGroup implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(GroupEntity)().create({
      name: "test1",
      permissions: [Permission.DELETE],
    });
    await factory(GroupEntity)().create({
      name: "test2",
      permissions: [Permission.SHARE],
    });
    await factory(GroupEntity)().create({
      name: "test3",
      permissions: [Permission.WRITE, Permission.SHARE],
    });
  }
}
