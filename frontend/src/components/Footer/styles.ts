import styled from 'styled-components';

export const Container = styled.footer`
	background-color: var(--primary-color);
	margin-top: auto;
`;

export const Content = styled.div`
	max-width: var(--base-container-width);
	margin: 0 auto;
	padding: 1rem 3.125rem;

	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 425px) {
		padding: 1rem;
		flex-direction: column;
	}

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

export const ColumnList = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;


	@media (max-width: 425px) {
		margin: 1rem 0;
	}

	.column {
		display: flex;
		flex-direction: column;
		max-width: 10rem;
		font-size: var(--f14-px);

		h4 {
			color: white;
			text-transform: uppercase;
			font-weight: normal;
		}

		ul {
			list-style: none;
			padding: 0;

			li {
				margin-top: 10px;

				a {
					color: white;
					text-decoration: none;
				}
			}
		}
	}
`

export const CareLuLuLinks = styled.div`
	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		a {
			width: 3rem;
			height: 3rem;
			text-decoration: none;
			transition: all 0.1s ease-out;

			&:hover {
				filter: opacity(0.8);
			}
		}
	}

	> img {
		max-width: 10rem;
		height: auto;
		margin-top: 1rem;
	}
`