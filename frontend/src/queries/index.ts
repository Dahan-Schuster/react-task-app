import { gql } from "@apollo/client";

export const GET_USERS = gql`
	query {
		users {
			id
			name
		}
	}
`

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