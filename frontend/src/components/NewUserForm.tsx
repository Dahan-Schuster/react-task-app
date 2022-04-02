import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";

import { GET_USERS } from "../App";
import { client } from "../lib/apollo";

// the method createUser in our API needs a parameter called name
const CREATE_USER = gql`
	# here we tell the useMutation hook to expect a parameter $name
	# unlike Ts, Gql marks **mandatory** arguments with a bang !
	mutation ($name: String!) {
		# and here we pass the received name to the API
		createUser(name: $name) {
			id
			name
		}
	}
`
/**
 * User creation form
 * Will send data through GraphQL with the Apollo client
 */
export function NewUserForm() {
	const [name, setName] = useState('');

	// useMutation is a hook that can be configured with a GQL query
	const [createUser] = useMutation(CREATE_USER);

	// The form's submit event handler
	async function handleCreateUser(event: FormEvent) {
		event.preventDefault();

		if (!name) return;

		await createUser({
			// here we fill the expected parameters list of our mutation
			variables: {
				name
			},
			// to update the users list we can:

			// make another query at the end of the creation
			// refetchQueries: [GET_USERS],

			// or update the cache with the new created user
			update: (cache, { data: { createUser } }) => {
				// get the cache of the last GET_USERS query made by the client
				const { users } = client.readQuery({ query: GET_USERS })

				// upates the cache
				cache.writeQuery({
					query: GET_USERS,
					data: {
						users: [
							...users,
							createUser,
						]
					}
				})
			}
		});
	}

	return (
		<form onSubmit={handleCreateUser}>
			<input type="text" value={name} onChange={e => setName(e.target.value)} />
			<button type="submit">Enviar</button>
		</form>
	)
}