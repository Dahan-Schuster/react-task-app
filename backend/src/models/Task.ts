import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Task {

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field(() => String)
	text: string;

	@Column({ default: false })
	@Field(() => Boolean)
	done: boolean;

	@ManyToOne(() => User, user => user.tasks)
	@Field((type) => User)
	@TypeormLoader()
	user: User;

}