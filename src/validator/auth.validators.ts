import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";

export const authValidators = createValidator();

export interface RequestAuthSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string;
    password: string;
  };
}
