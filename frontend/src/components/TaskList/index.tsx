import { useQuery } from "@apollo/client";
import { FC, useContext } from "react";

import AuthContext from "../../contexts/auth";
import NewTaskForm from "../NewTaskForm";
import TaskItem from "../TaskItem";

import { GET_TASKS } from "../../queries";
import { Container, Content, TasksContainer } from "./styles";

export interface ITask {
	text: string;
	done: boolean;
	id: string;
}

const TaskList: FC = () => {
	const { data, loading } = useQuery<{ tasks: ITask[] }>(GET_TASKS);
	const { username } = useContext(AuthContext);

	return (
		<Container>
			<Content>
				<h1>Wellcome back, {username}</h1>
				<NewTaskForm />

				<TasksContainer>
					<div>
						{!loading && (
							data?.tasks.map(task => (
								<TaskItem key={task.id} task={task} />
							))
						)}
					</div>
				</TasksContainer>
			</Content>
		</Container>
	)
}

export default TaskList;