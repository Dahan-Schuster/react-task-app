import { useQuery } from "@apollo/client";
import { FC, useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/auth";
import NewTaskForm from "../NewTaskForm";
import TaskItem from "../TaskItem";
import Button from "../Button";

import { GET_TASKS } from "../../queries";
import { Container, Content, TasksContainer } from "./styles";
import { lstoragePrefix } from "../../App";

import iconChecked from '../../assets/checkbox_checked.svg';
import iconUnchecked from '../../assets/checkbox_unchecked.svg';

export interface ITask {
	text: string;
	done: boolean;
	id: string;
}

const TaskList: FC = () => {
	// username for wellcome message
	const { username } = useContext(AuthContext);

	// fetches the task list just after page load
	const { data, loading, refetch } = useQuery<{ tasks: ITask[] }>(GET_TASKS);

	// the task list filter: { false: undone, true: done, undefined: all }
	const [statusFilter, setStatusFilter] = useState<boolean | undefined>();

	/**
	 * Looks for saved preferences for task filter in the local storage
	 */
	useEffect(() => {
		const savedFilter = localStorage.getItem(`${lstoragePrefix}:filter`);
		if (savedFilter && savedFilter != 'undefined') {
			setStatusFilter(JSON.parse(savedFilter));
		}
	}, [])

	/**
	 * Listen for changes in the status filter and
	 * refetch the task list with the new filter
	 * 
	 * Updates the saved filter in local storage on success
	 */
	useEffect(() => {
		refetch({ completed: statusFilter })
			.then(() => {
				localStorage.setItem(`${lstoragePrefix}:filter`, JSON.stringify(statusFilter));
			});
	}, [statusFilter])

	return (
		<Container>
			<Content>
				<h1>Wellcome back, {username}</h1>
				<NewTaskForm currentFilter={statusFilter} />

				<TasksContainer>
					<div className="filterButtonsGroup">
						<Button title="all" iconButton
							active={statusFilter == undefined} onClick={() => {
								setStatusFilter(undefined);
							}} />

						<Button icon={iconChecked} iconButton
							active={statusFilter == true} onClick={() => {
								setStatusFilter(true);
							}} />

						<Button icon={iconUnchecked} iconButton
							active={statusFilter == false} onClick={() => {
								setStatusFilter(false);
							}} />
					</div>
					<div>
						{!loading && (
							data?.tasks.map(task => (
								<TaskItem key={task.id}
									task={task}
									currentFilter={statusFilter} />
							))
						)}
					</div>
				</TasksContainer>
			</Content>
		</Container>
	)
}

export default TaskList;