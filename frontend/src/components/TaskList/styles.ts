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
		width: 100%;
		margin-right: 0;
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
		width: calc(100% - 20px);
	}

	h1 {
		color: white;
	}
`
export const TasksContainer = styled.div`
	margin-top: 1rem;

`