import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { AuthContext } from "../contexts/AuthContext";

import { CreateTaskInput } from "../inputs/CreateTaskInput";
import { isAuth } from "../middlewares/isAuth";
import { Task } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";

@ObjectType()
class SuccessResponse {
	@Field()
	success: boolean;
}

@Resolver()
export class TaskResolver {
	private taskRepository: TaskRepository;

	constructor() {
		this.taskRepository = new TaskRepository();
	}

	/**
	 * Fetches all the tasks from the authenticated user
	 * @returns Task[]
	 */
	@Query(() => [Task])
	@UseMiddleware(isAuth)
	async tasks(
		@Ctx() { user }: AuthContext
	) {
		return await this.taskRepository.findAllByUser(user);
	}

	/**
	 * Creates a new task associated to the authenticated user
	 * @returns Task
	 */
	@Mutation(() => Task)
	@UseMiddleware(isAuth)
	async createTask(
		@Arg('data') { text, done }: CreateTaskInput,
		@Ctx() { user }: AuthContext
	) {
		const task = await this.taskRepository.create({ text, done }, user);
		return task;
	}

	/**
	 * Deletes an authenticated user's task by id
	 * @returns Task
	 */
	@Mutation(() => SuccessResponse)
	@UseMiddleware(isAuth)
	async deleteTask(
		@Arg('id') id: string,
		@Ctx() { user }: AuthContext
	) {
		return {
			success: await this.taskRepository.deleteFromUser(id, user)
		};
	}

	/**
	 * Toggles a task's state (done / undone)
	 * @returns Task
	 */
	@Mutation(() => Task)
	@UseMiddleware(isAuth)
	async toggleStatus(
		@Arg('id') id: string,
		@Ctx() { user }: AuthContext
	) {
		return await this.taskRepository.toggleStatus(id, user);
	}

}