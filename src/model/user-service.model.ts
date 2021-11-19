import { IUser } from "./user";

export interface UserServiceModel {
  create: (user: IUser) => Promise<IUser>;
  update: (newUser: IUser, id: string) => Promise<IUser>;
  delete: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<IUser | undefined>;
  checkUnique: (login: string) => Promise<boolean>;
  findBySubstringAndLimit: (login: string, limit: number) => Promise<IUser[]>;
}
