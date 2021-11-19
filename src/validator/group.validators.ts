import {
  ContainerTypes,
  createValidator,
  ValidatedRequestSchema,
} from "express-joi-validation";

export const groupValidators = createValidator();

export interface RequestGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string;
    name: string;
    permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
  };
}
