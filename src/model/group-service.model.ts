import { IGroupModel } from "./group.model";

export interface GroupServiceModel {
  getAll: () => Promise<IGroupModel[]>;
  create: (group: IGroupModel) => Promise<IGroupModel>;
  update: (group: IGroupModel, id: string) => Promise<IGroupModel>;
  delete: (id: string) => Promise<boolean>;
  deleteGroup: (id: string) => Promise<boolean>;
  findById: (id: string) => Promise<IGroupModel | undefined>;
  checkUnique: (login: string) => Promise<boolean>;
}
