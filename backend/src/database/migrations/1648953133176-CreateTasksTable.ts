import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTasksTable1648953133176 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "task",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "text",
						type: "varchar",
					},
					{
						name: "done",
						type: "boolean",
						default: false
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("tasks");
	}

}
