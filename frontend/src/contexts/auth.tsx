import { ApolloError, MutationResult, useMutation } from '@apollo/client';
import React, { createContext, useEffect, useState } from 'react';
import { lstoragePrefix } from '../App';
import { AUTH_USER, CREATE_USER } from '../queries';

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
		if (accessToken && !!user.username) {
			setToken(accessToken);
			setUsername(user.username);

			localStorage.setItem(`${lstoragePrefix}:token`, accessToken);
			localStorage.setItem(`${lstoragePrefix}:username`, user.username); x
		}
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
		localStorage.removeItem(`${lstoragePrefix}:token`);
		localStorage.removeItem(`${lstoragePrefix}:username`);
		localStorage.removeItem(`${lstoragePrefix}:filter`);
	}

	useEffect(() => {
		const storagedToken = localStorage.getItem(`${lstoragePrefix}:token`);
		const storagedUsername = localStorage.getItem(`${lstoragePrefix}:username`);
		if (storagedToken && storagedUsername) {
			setToken(storagedToken);
			setUsername(storagedUsername);
		}
	}, []);


	return (
		<AuthContext.Provider value={{ signed: !!token, username, token, Login, Logout, SignUp, error, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;