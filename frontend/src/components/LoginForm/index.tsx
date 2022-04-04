import { FC, FormEvent, useCallback, useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import { Container } from "./styles";

/**
 * User creation form
 * Will send data through GraphQL with the Apollo client
 */
const LoginForm: FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { Login, error, loading } = useContext(AuthContext);


	const handleLogin = useCallback(async (event: FormEvent) => {
		event.preventDefault();

		typeof Login == "function" && await Login({
			username,
			password
		});
	}, [Login])

	return (
		<Container>
			<form onSubmit={handleLogin}>
				<div className="form-group">
					<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
				</div>
				<div className="form-group">
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				{error && (
					<div className="form-group">
						<p className="error">{error}</p>
					</div>
				)}
				<div className="form-group">
					<button disabled={loading} type="submit">Login</button>
				</div>
			</form>
		</Container>
	)
}

export default LoginForm;