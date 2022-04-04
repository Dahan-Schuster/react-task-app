import { FC } from 'react'
import logoImg from '../../assets/logo_header.svg'
import { Container, Content } from './styles'

const Header: FC = () => {
	return (
		<Container>
			<Content>
				<img src={logoImg} alt="Simple Task App" />
				<button>Login</button>
			</Content>
		</Container>
	)
}

export default Header;