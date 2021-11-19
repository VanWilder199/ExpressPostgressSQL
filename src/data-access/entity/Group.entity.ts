import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { IGroupModel } from "../../model/group.model";
import { UserEntity } from "./User.entity";

@Entity({
  name: "group",
})
export class GroupEntity implements IGroupModel {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    array: true,
    type: "varchar",
  })
  permissions: string[];

  @ManyToMany(() => UserEntity, (user) => user.group, {
    eager: true,
    cascade: true,
    nullable: false,
    orphanedRowAction: "delete",
  })
  @JoinTable()
  user: UserEntity[];
}
