import { getManager, getRepository, Repository } from "typeorm";
import { GroupServiceModel } from "../model/group-service.model";
import { GroupEntity } from "../data-access/entity/Group.entity";
import { IGroupModel } from "../model/group.model";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "../data-access/entity/User.entity";

export class GroupService implements GroupServiceModel {
  private group: Repository<GroupEntity>;
  private user: Repository<UserEntity>;

  async getAll(): Promise<IGroupModel[]> {
    this.group = getRepository(GroupEntity);

    return await this.group.find();
  }

  async create(group: IGroupModel): Promise<IGroupModel> {
    this.group = getRepository(GroupEntity);

    const createGroup: IGroupModel = {
      id: uuidv4(),
      ...group,
    };

    await this.group.save(createGroup);

    return await this.group.findOne(createGroup.id);
  }

  async update(group: IGroupModel, id: string): Promise<IGroupModel> {
    this.group = getRepository(GroupEntity);

    const groupUpdate = await this.group.findOne(id);

    if (groupUpdate) {
      await this.group.save(group);
      return group;
    }
    return groupUpdate;
  }

  async findById(id: string): Promise<IGroupModel | undefined> {
    this.group = getRepository(GroupEntity);

    return await this.group.findOne({ id });
  }
  async delete(id: string): Promise<boolean> {
    this.group = getRepository(GroupEntity);

    const group = await this.group.delete({ id });

    return !!group;
  }
  async deleteGroup(id: string): Promise<boolean> {
    this.group = getRepository(GroupEntity);

    const group = await this.group.delete({ id });

    return !!group;
  }
  async checkUnique(name: string): Promise<boolean> {
    this.group = getRepository(GroupEntity);

    const isUniqueGroup = await this.group.findOne({ name });

    return !!isUniqueGroup;
  }

  async addUsersToGroup(idGroup: string, idsUsers: string[]): Promise<void> {
    const idsUserArr = Object.values(idsUsers).flat();

    const groupToAddUserIds = await this.group.findOne({ id: idGroup });
    idsUserArr.forEach(async (id) => {
      const isUserInGroup =
        groupToAddUserIds.user.filter((user) => user.id === id).length > 0;

      if (isUserInGroup) {
        return;
      }

      const user = await this.user.findOne({ id });
      if (user) {
        groupToAddUserIds.user.push(user);
      }
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(groupToAddUserIds);
    });
  }
}
