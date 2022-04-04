import { FC, useContext } from 'react'
import logoImg from '../../assets/logo_header.svg'
import AuthContext from '../../contexts/auth'
import Button from '../Button'
import { Container, Content } from './styles'

const Header: FC = () => {
	const { signed, Logout } = useContext(AuthContext);

	return (
		<Container>
			<Content>
				<img src={logoImg} alt="Simple Task App" />

				{signed && (
					<Button title='Logout' onClick={Logout} />
				)}
			</Content>
		</Container>
	)
}

export default Header;