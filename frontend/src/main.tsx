import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client';

import App from './App'
import { client } from './lib/apollo';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
