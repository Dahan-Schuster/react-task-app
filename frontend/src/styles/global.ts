import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--background-color: #fafafa;
		--primary-color: #23AAAA;
		--secondary-color: #97D1D0;
		--accent-color: #FEB708;

		--f14-px: 87.50%;
		--f15-px: 93.75%;
	}
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	// font-size: 16px (Desktop)
	html {
		@media (max-width: 1080px) {
			font-size: var(--f15-px);
		}

		@media (max-width: 720px) {
			font-size: var(--f14-px);
		}
	}

	body {
		background-color: var(--background-color);
		-webkit-font-smoothing: antialiased;
		min-height: 100vh;
	}

	button {
		cursor: pointer;
	}
`

export default GlobalStyle;