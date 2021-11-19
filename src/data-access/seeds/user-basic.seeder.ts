import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../entity/User.entity";

export default class CreateUsers implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(UserEntity)().createMany(1);
  }
}
