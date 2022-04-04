import { useMutation } from "@apollo/client";
import { FC, FormEvent, useCallback, useState } from "react";

import { client } from "../../lib/apollo";

import { CREATE_TASK, GET_TASKS } from "../../queries";
import { Container } from "./styles";

const NewTaskForm: FC = () => {
	const [createTask, { loading }] = useMutation(CREATE_TASK)
	const [text, setText] = useState("");

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
				// get the cache of the last GET_TASKS query made by the client
				const { tasks } = client.readQuery({ query: GET_TASKS })

				// upates the cache
				cache.writeQuery({
					query: GET_TASKS,
					data: {
						tasks: [
							...tasks,
							createTask,
						]
					}
				})

				// clean the textarea
				setText("");
			}
		})
	}, [text])

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<textarea disabled={loading} placeholder="Write a new task"
					onChange={(e) => setText(e.target.value)} value={text}></textarea>
				<button>Send</button>
			</form>
		</Container>
	)
}

export default NewTaskForm;