import { ApolloCache, useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { DELETE_TASK, TOGGLE_TASK } from "../../queries";
import { ITask } from "../TaskList";
import { Container } from "./styles";

import deleteIcon from '../../assets/delete_icon.svg';

interface TaskProps {
	task: ITask;
	currentFilter?: boolean;
}

const TaskItem = ({ task, currentFilter }: TaskProps) => {
	const { id, text, done } = task;
	const [checked, setChecked] = useState(done);
	const [toggleTask] = useMutation(TOGGLE_TASK)
	const [deleteTask] = useMutation(DELETE_TASK)

	/**
	 * Requests change in the task status (done/undone)
	 * If the new status doesn't fit with the current filter,
	 * removes the task from the cache
	 */
	const handleStatusChange = useCallback(async (checked: boolean) => {
		await toggleTask({
			variables: {
				taskId: id,
			},
			onCompleted: () => {
				setChecked(checked);
			},
			update: (cache) => {
				if (currentFilter !== undefined && checked !== currentFilter)
					removeTaskFromList(cache, id);
			}
		})

	}, [id, currentFilter]);

	/**
	 * Requests the task deletion and removes it from the cache afterwards
	 */
	const handleDeleteTask = useCallback(async () => {
		await deleteTask({
			variables: {
				taskId: id,
			},
			update: (cache) => {
				removeTaskFromList(cache, id);
			}
		})
	}, [id])

	/**
	 *  Removes a task from the cache
	 */
	const removeTaskFromList = useCallback((cache: ApolloCache<any>, taskId: string) => {
		const normalizedId = cache.identify({ id: taskId, __typename: 'Task' });
		cache.evict({ id: normalizedId });
		cache.gc();
	}, []);

	return (
		<Container>
			<input id={`${id}_taskState`} type="checkbox"
				checked={checked} onChange={e => handleStatusChange(e.target.checked)} />
			<label htmlFor={`${id}_taskState`} className={checked ? "done" : "undone"}>{text}</label>
			<button onClick={handleDeleteTask}>
				<img src={deleteIcon} alt="Delete" />
			</button>
		</Container>
	)
}

export default TaskItem;