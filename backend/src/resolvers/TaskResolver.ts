import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { FindConditions } from "typeorm";
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

@ObjectType()
class TaskOverviewResonse {
	@Field()
	total: number;

	@Field()
	done: number;

	@Field()
	undone: number;
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
		@Ctx() { user }: AuthContext,
		@Arg('completed', { nullable: true }) completed?: boolean
	) {
		// Can filter by status of completion, or list all tasks
		const filters = completed === undefined ? undefined : {
			done: completed
		} as FindConditions<Task>;

		return await this.taskRepository.findAllByUser(user, filters);
	}

	/**
	 * Returns the user's task quantity overview
	 * @returns Task[]
	 */
	@Query(() => TaskOverviewResonse)
	@UseMiddleware(isAuth)
	async tasksTotal(
		@Ctx() { user }: AuthContext,
	) {
		const [total, done, undone] = await this.taskRepository.getTotalByUser(user);
		return { total, done, undone };
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
		try {
			await this.taskRepository.deleteFromUser(id, user)
			return { success: true };
		} catch (e) {
			return { success: false };
		}
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