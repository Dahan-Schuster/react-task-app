import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1648952608006 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "user",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "username",
						type: "varchar",
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					},
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}

}
