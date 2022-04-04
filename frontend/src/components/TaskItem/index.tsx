import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { DELETE_TASK, GET_TASKS, TOGGLE_TASK } from "../../queries";
import { ITask } from "../TaskList";
import { Container } from "./styles";

import deleteIcon from '../../assets/delete_icon.svg';

interface TaskProps {
	task: ITask
}

const TaskItem = ({ task }: TaskProps) => {
	const { id, text, done } = task;
	const [checked, setChecked] = useState(done);
	const [toggleTask] = useMutation(TOGGLE_TASK)
	const [deleteTask] = useMutation(DELETE_TASK)

	const handleStatusChange = useCallback(async (checked: boolean) => {
		await toggleTask({
			variables: {
				taskId: id,
			},
			onCompleted: ({ toggleStatus }) => {
				setChecked(toggleStatus.done);
			}
		})

	}, [id]);

	const handleDeleteTask = useCallback(async () => {
		await deleteTask({
			variables: {
				taskId: id,
			},


			update: (cache) => {
				// removes the task from the cache
				const normalizedId = cache.identify({ id, __typename: 'Task' });
				cache.evict({ id: normalizedId });
				cache.gc();
			}
		})
	}, [id])

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