import { ApolloError, MutationResult, useMutation } from '@apollo/client';
import React, { createContext, useState } from 'react';
import { AUTH_USER } from '../queries';

interface AuthUserInput {
	username: string;
	password: string;
}

interface IAuthContextData {
	signed: boolean;
	token: string;
	error: string;
	loading: boolean;
	Login(input: AuthUserInput): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [authUser] = useMutation(AUTH_USER);
	const [token, setToken] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function Login({ username, password }: AuthUserInput): Promise<void> {
		setLoading(true);

		await authUser({
			variables: {
				data: {
					username,
					password
				}
			},
			onCompleted: ({ authUser }) => {
				setToken(authUser.accessToken);
				setLoading(false);
				setError('');
			},
			onError: ({ message }) => {
				setLoading(false);
				setError(message);
			}
		})
	}


	return (
		<AuthContext.Provider value={{ signed: !!token, token, Login, error, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;