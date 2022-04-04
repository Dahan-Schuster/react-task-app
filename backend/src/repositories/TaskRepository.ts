import { FindConditions, getRepository, Repository, TreeRepository } from "typeorm";
import { CreateTaskInput } from "../inputs/CreateTaskInput";
import { Task } from "../models/Task";
import { User } from "../models/User";

/**
 * TypeORM repository for the Task entity
 */
export class TaskRepository {
	private repository: Repository<Task>;

	constructor() {
		this.repository = getRepository(Task);
	}

	/**
	 * Returns all tasks associated to the authenticated user
	 * 
	 * @param user the athenticated user
	 * @param filters additional filters to be passed to the find method
	 * @returns the list of tasks from the user
	 */
	async findAllByUser(user: User, filters?: FindConditions<Task>): Promise<Task[]> {
		return this.repository.find({ user: { id: user.id }, ...filters });
	}

	/**
	 * Returns an array of users's tasks totals
	 * 
	 * @param user the athenticated user
	 * @returns [total, done, undone]
	 */
	async getTotalByUser(user: User): Promise<number[]> {
		const done = await this.repository.count({ user: { id: user.id }, done: true });
		const undone = await this.repository.count({ user: { id: user.id }, done: false });

		return [done + undone, done, undone];
	}

	/**
	 * Creates a new task for the user
	 * 
	 * @param data the task info
	 * @param user the athenticated user
	 * @returns 
	 */
	async create({ text, done }: CreateTaskInput, user: User): Promise<Task> {

		const task = this.repository.create({
			text,
			user,
			done: done ? true : false
		});
		return this.repository.save(task);
	}

	/**
	 * Returns all tasks from an user filtered by status (done/undone)
	 * 
	 * @param done weather the task is done or not
	 * @param user the authenticated user
	 * @returns all (un)done tasks from the user
	 */
	async findByDone(done: boolean, user: User): Promise<Task[] | undefined> {
		return this.repository.find({
			where: {
				done,
				user: {
					id: user.id
				},
			}
		});
	}

	/**
	 * Deletes a task from an user by id
	 * 
	 * @param id the task id
	 * @param user the authenticated user
	 */
	async deleteFromUser(id: string, user: User): Promise<void> {
		await this.repository.delete({
			user: { id: user.id },
			id,
		});
	}

	/**
	 * Deletes all tasks from an user
	 * 
	 * @param user the authenticated user
	 */
	async deleteAllFromUser(user: User): Promise<void> {
		await this.repository.delete({
			user: { id: user.id }
		})
	}


	/**
	 * Inverts a task's status (done/undone)
	 * 
	 * @param id the task id
	 * @param user the authenticated user
	 * @returns the deletion result
	 */
	async toggleStatus(id: string, user: User): Promise<Task> {
		const task = await this.repository.findOne(id, {
			where: {
				user: {
					id: user.id
				}
			}
		})

		if (!task)
			throw new Error('Task not found');

		task.done = !task.done;
		return await this.repository.save(task);
	}
}