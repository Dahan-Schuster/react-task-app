import { gql } from "@apollo/client";

export const CREATE_USER = gql`
	mutation CreateUser($data: CreateUserInput!) {
		createUser (data: $data) {
			accessToken
			user {
				username
			}
		}
	}
`
export const DELETE_USER = gql`
	mutation DeleteUser {
		deleteUser {
			success
		}
	}
`

export const AUTH_USER = gql`
	mutation Login($data: AuthUserInput!) {
		authUser(data: $data) {
			accessToken
			user {
				username
			}
		}
	}
`

export const CREATE_TASK = gql`
	mutation CreateTask($data: CreateTaskInput!) {
		createTask(data: $data) {
			id
			text
			done
		}
	}
`
export const GET_TASKS = gql`
	query Tasks($completed: Boolean) {
		tasks(completed: $completed) {
			id
			text
			done
		}
	}
`
export const GET_TASKS_TOTALS = gql`
	query TasksTotals {
		tasksTotal {
			total
			done
			undone
		}
	}
`

export const TOGGLE_TASK = gql`
	mutation ToggleTask($taskId: String!) {
		toggleStatus(id: $taskId) {
			text
			done
		}
	}
`

export const DELETE_TASK = gql`
	mutation DeleteTask($taskId: String!) {
		deleteTask(id: $taskId) {
			success
		}
	}
`