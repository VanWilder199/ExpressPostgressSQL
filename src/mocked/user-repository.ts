import { IUser } from "../model/user";
import { v4 as uuidv4 } from "uuid";

export const userRepository: IUser[] = [
  {
    id: uuidv4(),
    login: "user1",
    password: "123fsdfxcv",
    age: 23,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "user2",
    password: "123fsdfxcv",
    age: 23,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "user3",
    password: "123fsdfxcv",
    age: 23,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "user4",
    password: "123asdvxc4234",
    age: 22,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "user5",
    password: "1zcxcerfsdf",
    age: 24,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "user6",
    password: "zcxzc123213o",
    age: 25,
    isDeleted: false,
  },
];
