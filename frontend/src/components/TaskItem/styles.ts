import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	background-color: #fff;
	border-radius: 4px;
	color: #545454;
	padding: .5rem .75rem;
	font-size: var(--f14-px);
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 1rem;

	input[type="checkbox"] {
		margin-right: .75rem;
	}

	label {
		&.done {
			text-decoration: line-through;
		}
	}

	button {
		border: none;
		background-color: transparent;
		margin-left: auto;

		img {
			max-width: 20px;
			height: auto;
		}
	}
`;
