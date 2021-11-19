import { IUser } from "../model/user";
import { getRepository, Repository, Like } from "typeorm";
import { UserEntity } from "../data-access/entity/User.entity";
import { v4 as uuidv4 } from "uuid";
import { MAX_USERS_PER_PAGE } from "../app.constants";
import { sortByLogin } from "../utils/sortByLogin";
import { UserServiceModel } from "../model/user-service.model";

export class PgUsersService implements UserServiceModel {
  private users: Repository<UserEntity>;

  async create(user: IUser): Promise<IUser> {
    this.users = getRepository(UserEntity);

    const createUser: IUser = {
      id: uuidv4(),
      ...user,
    };
    return this.users.save(createUser);
  }

  async delete(id: string): Promise<boolean> {
    this.users = getRepository(UserEntity);

    const user = await this.users.findOne({ id });

    if (user) {
      user.isDeleted = true;
      await this.users.save(user);
      return true;
    }
    return false;
  }

  async update(newUser: IUser, id: string): Promise<IUser> {
    this.users = getRepository(UserEntity);

    const userUpdate = await this.findById(id);

    if (userUpdate) {
      await this.users.save(newUser);
      return newUser;
    }
    return userUpdate;
  }

  async findById(id: string): Promise<IUser | undefined> {
    this.users = getRepository(UserEntity);

    return await this.users.findOne({ id });
  }

  async checkUnique(login: string): Promise<boolean> {
    this.users = getRepository(UserEntity);

    const user = await this.users.findOne({ login });
    return !!user;
  }

  async findBySubstringAndLimit(
    login: string,
    limit = MAX_USERS_PER_PAGE
  ): Promise<IUser[]> {
    this.users = getRepository(UserEntity);

    if (login !== undefined) {
      const userBySubstring = await this.users.find({
        login: Like(`%${login}%`),
        isDeleted: false,
      });
      if (userBySubstring.length > limit) {
        const update = userBySubstring.slice(0, limit);

        return update.sort(sortByLogin);
      } else {
        return userBySubstring.sort(sortByLogin);
      }
    } else {
      const user = await this.users.find({
        isDeleted: false,
      });
      if (user.length > limit) {
        const update = user.slice(0, limit);

        return update.sort(sortByLogin);
      } else {
        return user.sort(sortByLogin);
      }
    }
  }
  async getUserByLogin(login: string, password: string): Promise<IUser> {
    this.users = getRepository(UserEntity);

    try {
      return await this.users.findOne({ login, password });
    } catch (e) {
      throw new Error(e);
    }
  }
}
