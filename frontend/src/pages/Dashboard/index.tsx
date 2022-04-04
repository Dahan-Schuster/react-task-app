import { FC } from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import TaskList, { ITask } from "../../components/TaskList";
import TaskOverview from "../../components/TaskOverview";

import { Container } from "./styles";

export const Dashboard: FC = () => {

	return (
		<>
			<Header />
			<Container>
				<TaskList />
				<TaskOverview />
			</Container>
			<Footer />
		</>
	)
}