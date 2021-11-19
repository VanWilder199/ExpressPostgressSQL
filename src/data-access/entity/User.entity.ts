import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { IUser } from "../../model/user";
import { GroupEntity } from "./Group.entity";
@Entity({
  name: "users",
})
export class UserEntity implements IUser {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  isDeleted: boolean;

  @ManyToMany(() => GroupEntity, (group) => group.user, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  group: GroupEntity[];
}
