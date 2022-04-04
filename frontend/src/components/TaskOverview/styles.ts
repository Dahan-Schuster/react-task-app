import styled from 'styled-components';

export const Container = styled.aside`
	> div {
		& + div {
			margin-top: 1rem;
		}

		h2 {
			color: var(--accent-color);
			font-weight: lighter;
			font-size: 1.125rem;
			text-transform: uppercase;
		}

		p {
			color: #A6A6A6;
			font-size: 1.5rem;
		}
	}

	@media (max-width: 425px) {
		margin-bottom: 1rem;
		text-align: center;

		display: flex;
		justify-content: space-between;
		align-items:center;

		> div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			& + div {
				margin: 0;
			}
		}
	}

`;