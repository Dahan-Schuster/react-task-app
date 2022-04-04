import styled from 'styled-components';

export const ButtonContainer = styled.button`
	color: #ffffff;
	text-transform: uppercase;
	text-align: center;
	border: none;
	border-radius: 2px;
	padding: 0.6rem 1rem;

	&.accent {
		background-color: var(--accent-color);
	}

	&.pink {
		background-color: var(--accent-secondary-color);
	}
`;
