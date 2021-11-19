import { define } from "typeorm-seeding";
import { UserEntity } from "../entity/User.entity";
import * as faker from "faker";

define(UserEntity, () => {
  const user = new UserEntity();
  user.id = faker.random.uuid();
  user.login = "111vova100";
  user.password = faker.internet.password();
  user.age = faker.random.number({ min: 4, max: 130 });
  user.isDeleted = false;
  return user;
});
