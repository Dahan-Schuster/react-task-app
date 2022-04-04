import { FC, useContext } from 'react'
import logoImg from '../../assets/logo_header.svg'
import AuthContext from '../../contexts/auth'
import { Container, Content } from './styles'

const Header: FC = () => {
	const { signed, Logout } = useContext(AuthContext);

	return (
		<Container>
			<Content>
				<img src={logoImg} alt="Simple Task App" />

				{signed && (
					<button onClick={Logout}>Logout</button>
				)}
			</Content>
		</Container>
	)
}

export default Header;