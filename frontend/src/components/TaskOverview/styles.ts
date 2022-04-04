import styled from 'styled-components';

export const Container = styled.aside`
	> div {
		& + div {
			margin-top: 1rem;
		}

		h2 {
			color: var(--accent-color);
			font-weight: lighter;
			text-align: left;
			font-size: 1.125rem;
			text-transform: uppercase;
		}

		p {
			color: #A6A6A6;
			font-size: 1.5rem;
		}
	}
`;