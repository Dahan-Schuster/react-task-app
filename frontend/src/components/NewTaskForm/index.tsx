import { useMutation } from "@apollo/client";
import { FC, FormEvent, useCallback, useState } from "react";

import { client } from "../../lib/apollo";

import { CREATE_TASK, GET_TASKS } from "../../queries";
import Button from "../Button";
import { Container } from "./styles";

interface INewTaskFormProps {
	currentFilter: boolean | undefined;
}

const NewTaskForm = ({ currentFilter }: INewTaskFormProps) => {
	const [createTask, { loading }] = useMutation(CREATE_TASK)
	const [text, setText] = useState("");

	/**
	 * Requests the creation of a new task
	 * and add it to the cache afterwards
	 */
	const handleSubmit = useCallback(async (event: FormEvent) => {
		event.preventDefault();

		if (!text) return;

		await createTask({
			variables: {
				data: {
					text
				}
			},

			update: (cache, { data: { createTask } }) => {
				// clean the textarea
				setText("");

				// updates the cache only if the new task
				// would be shown by the current filter
				if (currentFilter === createTask.done || currentFilter === undefined) {

					// the variables used in the last query must be
					// sent in order to distinguish between the filters
					const currentQueryOptions = {
						query: GET_TASKS,
						variables: {
							completed: currentFilter
						}
					}

					// get the cache of the last GET_TASKS query made by the client
					const cacheData = client.readQuery(currentQueryOptions)

					if (cacheData) {
						const { tasks } = cacheData;

						// upates the cache
						cache.writeQuery({
							...currentQueryOptions,
							data: {
								tasks: [
									...tasks,
									createTask,
								]
							}
						})
					}
				}
			}
		})
	}, [text, currentFilter])

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<textarea disabled={loading} placeholder="Write a new task"
					onChange={(e) => setText(e.target.value)} value={text}></textarea>
				<Button variant="pink" align="right" title="Send" type="submit" />
			</form>
		</Container>
	)
}

export default NewTaskForm;