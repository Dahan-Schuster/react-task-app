import styled from 'styled-components';

export const Container = styled.section`
  	background-color: var(--secondary-color);
	margin-right: 2rem;
	width: 700px;
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 768px) {
		width: 486px;
	}

	@media (max-width: 425px) {
		width: calc(100% - 1rem);
		margin: 0 auto;
	}
`;

export const Content = styled.div`
	border: 1px white dashed;
	width: 680px;
	padding: 1rem;

	@media (max-width: 768px) {
		width: 466px;
	}

	@media (max-width: 425px) {
		width: 100%;
	}

	h1 {
		color: white;
	}
`
export const TasksContainer = styled.div`
	margin-top: 1rem;

	.filterButtonsGroup {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: -3rem;

		> button + button {
			margin-left: .5rem;
		}
	}

`