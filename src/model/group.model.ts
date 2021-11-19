export interface IGroupModel {
  id?: string;
  name: string;
  permissions: string[];
  idsUsers?: string[];
}

export enum Permission {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  SHARE = "SHARE",
  UPLOAD_FILES = "UPLOAD_FILES",
}
