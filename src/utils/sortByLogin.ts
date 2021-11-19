import { IUser } from "../model/user";

export const sortByLogin = (a: IUser, b: IUser): number => {
  return a.login > b.login ? 1 : b.login > a.login ? -1 : 0;
};
