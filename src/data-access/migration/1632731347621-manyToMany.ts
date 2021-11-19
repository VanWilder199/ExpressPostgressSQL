import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class manyToMany1632731347621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_group",
        columns: [
          {
            name: "groupID",
            type: "varchar",
          },
          {
            name: "userID",
            type: "varchar",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "users_group",
      new TableForeignKey({
        columnNames: ["groupID"],
        referencedColumnNames: ["id"],
        referencedTableName: "group",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "users_group",
      new TableForeignKey({
        columnNames: ["userID"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users_group");
    const groupsIdForeignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("groupID") !== -1
    );
    const usersIdForeignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("usersID") !== -1
    );

    groupsIdForeignKey &&
      (await queryRunner.dropForeignKey("users_group", groupsIdForeignKey));
    usersIdForeignKey &&
      (await queryRunner.dropForeignKey("users_group", usersIdForeignKey));
    await queryRunner.dropTable("users_group");
  }
}
