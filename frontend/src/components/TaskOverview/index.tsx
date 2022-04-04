import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_TASKS_TOTALS } from "../../queries";
import { Container } from "./styles";

interface ITasksTotals {
	total: number;
	done: number;
	undone: number;
}

const TaskOverview = () => {

	const { data } = useQuery<{ tasksTotal: ITasksTotals }>(GET_TASKS_TOTALS, {
		pollInterval: 500
	});

	return (
		<Container>
			<div>
				<h2>Tasks Total</h2>
				<p>{data?.tasksTotal.total || 0}</p>
			</div>
			<div>
				<h2>Tasks Done</h2>
				<p>{data?.tasksTotal.done || 0}</p>
			</div>
			<div>
				<h2>Tasks To Do</h2>
				<p>{data?.tasksTotal.undone || 0}</p>
			</div>
		</Container>
	)
}

export default TaskOverview;