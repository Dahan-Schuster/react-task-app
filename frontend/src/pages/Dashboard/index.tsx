import { FC } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TaskList from "../../components/TaskList";
import { Container } from "./styles";

export const Dashboard: FC = () => {

	return (
		<>
			<Header />
			<Container>
				<TaskList />
				<aside className="">
					<div>
						<h2>Total Tasks Done</h2>
						<p>7</p>
					</div>
					<div>
						<h2>Tasks To DO</h2>
						<p>7</p>
					</div>
				</aside>
			</Container>
			<Footer />
		</>
	)
}