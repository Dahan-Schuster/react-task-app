import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
@ObjectType()
export class User {

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field(() => String)
	username: string;

	@Column()
	@Field(() => String)
	password: string;

	@Column()
	@Field(() => Date)
	created_at: Date;

	@OneToMany(() => Task, task => task.user, { cascade: true })
	@Field((type) => [Task])
	@TypeormLoader()
	tasks: Task[];
}