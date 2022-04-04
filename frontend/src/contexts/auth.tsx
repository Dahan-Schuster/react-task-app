import { ApolloError, MutationResult, useMutation } from '@apollo/client';
import React, { createContext, useEffect, useState } from 'react';
import { AUTH_USER, CREATE_USER } from '../queries';

const lsPrefix = '@SimpleTaskApp';

interface AuthUserInput {
	username: string;
	password: string;
}

interface IAuthUserResponse {
	user: {
		username: string;
	};
	accessToken: string;
}

interface IAuthContextData {
	signed: boolean;
	token: string;
	username: string;
	error: string;
	loading: boolean;
	Login(input: AuthUserInput): Promise<void>;
	SignUp(input: AuthUserInput): Promise<void>;
	Logout(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [authUser] = useMutation(AUTH_USER);
	const [createUser] = useMutation(CREATE_USER);
	const [token, setToken] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	function updateAuthUser({ accessToken, user }: IAuthUserResponse) {
		setToken(accessToken);
		setUsername(user.username);

		localStorage.setItem(`${lsPrefix}:token`, accessToken);
		localStorage.setItem(`${lsPrefix}:username`, user.username);
	}

	async function Login({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);

		await authUser({
			variables: {
				data: {
					username,
					password
				}
			},
			onCompleted: ({ authUser }) => {
				updateAuthUser(authUser);
				setLoading(false);
				setError('');
			},
			onError: ({ message }) => {
				setLoading(false);
				setError(message);
			}
		})
	}

	async function SignUp({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);

		await createUser({
			variables: {
				data: {
					username,
					password
				}
			},
			onCompleted: ({ createUser }) => {
				console.log(createUser);
				updateAuthUser(createUser);
				setLoading(false);
				setError('');
			},
			onError: ({ message }) => {
				setLoading(false);
				setError(message);
			}
		});
	}

	function Logout(): void {
		setToken("");
		localStorage.removeItem(`${lsPrefix}:token`);
	}

	useEffect(() => {
		const storagedToken = localStorage.getItem(`${lsPrefix}:token`);
		if (storagedToken) {
			setToken(storagedToken);
		}
	}, []);


	return (
		<AuthContext.Provider value={{ signed: !!token, username, token, Login, Logout, SignUp, error, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;