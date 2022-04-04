import styled from 'styled-components';

export const Container = styled.header`
	background-color: var(--primary-color);
	margin-bottom: 5rem;
`;

export const Content = styled.div`
	max-width: var(--base-container-width);
	margin: 0 auto;
	padding: 1rem 3.125rem;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.buttonGroup {
		display: flex;

		button + button {
			margin-left: .5rem
		}
	}
`