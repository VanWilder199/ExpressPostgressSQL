import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";

export const usersValidators = createValidator();

export interface RequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string;
    name: string;
    password: string;
    age: number;
  };
}
