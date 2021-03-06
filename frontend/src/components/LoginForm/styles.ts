import styled from 'styled-components';

export const Container = styled.div`
	max-width: var(--base-container-width);
	margin: 0 auto;
	min-height: 30rem;


	form {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background-color: var(--secondary-color);

		.form-group {
			margin: .75rem 0;
			width: 100%;

			input {
				height: 40px;
				width: 100%;
				border: 1px #D3D6D6 solid;
				border-radius: 2px;
				color: #545454;
				font-size: var(--f14-px);
				padding: 0.5rem 0.75rem;
			}

			.error {
				color: var(--error-color);
			}

			.btnAccount {
				color: var(--accent-secondary-color);
				background-color: transparent;
				border: none;
			}
		}
	}
`;

export const ImgContainer = styled.div`
	background-color: #D4D4D4;
	padding: 0.2rem 1rem;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 175px;
		height: auto;
	}
`