import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTaskInput {

	@Field()
	text: string;

	@Field({ nullable: true })
	done: boolean;
}
