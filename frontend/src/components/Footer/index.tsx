import logoImg from '../../assets/logo_footer.svg'
import carelululogoImg from '../../assets/carelulu_logo.svg'
import fbIcon from '../../assets/facebook_icon.svg'
import ttIcon from '../../assets/twitter_icon.svg'
import igIcon from '../../assets/instagram_icon.svg'

import { Container, Content, ColumnList, CareLuLuLinks } from './styles'
import { FC } from 'react'

const columns = [
	{
		title: 'Backend Technologies',
		list: [
			{ text: 'Apollo, GraphQL', link: 'https://www.apollographql.com/' },
			{ text: 'Node.js, Typescript', link: 'https://nodejs.dev/learn/nodejs-with-typescript/' },
			{ text: 'TypeORM', link: 'https://www.npmjs.com/package/typeorm/v/0.2.45' },
			{ text: 'Express', link: 'https://expressjs.com/' },
		]
	}, {
		title: 'Frontend Technologies',
		list: [
			{ text: 'Apollo Client', link: 'https://www.apollographql.com/docs/react/' },
			{ text: 'React.js', link: 'https://reactjs.org/' },
			{ text: 'Vite', link: 'https://vitejs.dev/guide/' },
			{ text: 'Styled Components', link: 'https://www.styled-components.com/' },
		]
	},
	{
		title: 'More',
		list: [
			{ text: 'Star on Github', link: 'https://github.com/Dahan-Schuster/react-task-app' },
			{ text: 'LinkedIn', link: 'https://www.linkedin.com/in/dahan-schuster/' },
			{ text: 'Notion', link: 'https://schuster-codes.notion.site/React-Node-js-GraphQL-bf92e27dace246f6830d1a4e55833998' },
		]
	},
];

const Footer: FC = () => {
	return (
		<Container>
			<Content>
				<img src={logoImg} alt="Simple Task App" />
				<ColumnList>
					{columns.map(
						({ title, list }, i) => (
							<div className='column' key={i}>
								<h4>{title}</h4>
								<ul>
									{list.map(({ text, link }, j) => (
										<li key={j}>
											<a href={link} target="_blank">{text}</a>
										</li>
									))}
								</ul>
							</div>
						)
					)}
				</ColumnList>
				<CareLuLuLinks>
					<div>
						<a href="https://www.facebook.com/carelulu">
							<img src={fbIcon} alt="Facebook" />
						</a>
						<a href="https://twitter.com/mycarelulu">
							<img src={ttIcon} alt="Twitter" />
						</a>
						<a href="https://instagram.com/mycarelulu">
							<img src={igIcon} alt="Instagram" />
						</a>
					</div>
					<img src={carelululogoImg} alt="CareLuLu" />
				</CareLuLuLinks>
			</Content>
		</Container>
	)
}

export default Footer;