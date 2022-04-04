import { FC, FormEvent, useCallback, useContext, useState } from "react";

import AuthContext from "../../contexts/auth";

import { Container, ImgContainer } from "./styles";
import logoImg from '../../assets/logo_login.svg';

/**
 * User creation form
 * Will send data through GraphQL with the Apollo client
 */
const LoginForm: FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [doLogin, setDoLogin] = useState(true);

	const { Login, SignUp, error, loading } = useContext(AuthContext);


	const handleSubmit = useCallback(async (event: FormEvent) => {
		event.preventDefault();

		const handler = doLogin ? handleLogin : handleSignUp;
		await handler();
	}, [doLogin]);

	const handleLogin = useCallback(async () => {
		typeof Login == "function" && await Login({
			username,
			password
		});
	}, [Login])

	const handleSignUp = useCallback(async () => {
		typeof SignUp == "function" && await SignUp({
			username,
			password
		});
	}, [Login])

	return (
		<Container>
			<ImgContainer>
				<img src={logoImg} alt="Simple Task App" />
			</ImgContainer>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
				</div>
				<div className="form-group">
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				{error && (
					<div className="form-group">
						<small className="error">{error}</small>
					</div>
				)}
				<div className="form-group">
					{doLogin ? (
						<small>Don't have an account?&nbsp;
							<button className="btnAccount" type="button"
								onClick={() => setDoLogin(false)}>
								Sign Up
							</button>
						</small>
					) : (
						<small>Already have an account?&nbsp;
							<button className="btnAccount" type="button"
								onClick={() => setDoLogin(true)}>
								Log in
							</button>
						</small>
					)}
				</div>
				<div className="form-group">
					<button disabled={loading} type="submit">
						{doLogin ? 'Login' : 'Signup'}
					</button>
				</div>
			</form>
		</Container>
	)
}

export default LoginForm;