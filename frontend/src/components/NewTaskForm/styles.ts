import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;
	width: 100%;

	textarea {
		width: 100%;
		resize: vertical;
		min-height: 40px;
		height: 80px;
		max-height: 500px;
		padding: 0.5rem 0.75rem;
		color: #545454;
		border: 1px #D3D6D6 solid;
		border-radius: 4px;
		margin-bottom: .5rem;
	}

	button {
		background-color: var(--accent-secondary-color);
		color: #ffffff;
		text-transform: uppercase;
		text-align: center;
		border: none;
		border-radius: 2px;
		padding: 0.6rem 1rem;
		display: block;
		margin: 0 0 0 auto;
	}
`;
