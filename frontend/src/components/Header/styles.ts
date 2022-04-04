import styled from 'styled-components';

export const Container = styled.footer`
	background-color: var(--primary-color);
`;

export const Content = styled.div`
	max-width: 1120px;
	margin: 0 auto;
	padding: 1rem 3.125rem;

	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		background-color: var(--accent-color);
		color: #ffffff;
		text-transform: uppercase;
		text-align: center;
		border: none;
		border-radius: 2px;
		padding: 0.6rem 1rem;
	}
`