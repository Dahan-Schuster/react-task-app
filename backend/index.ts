import "reflect-metadata";

import path from 'path';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql'

import { UserResolver } from "./src/resolvers/UserResolver";

import './src/database/';

async function main() {

	/**
	 * Builds the GraphqQL schema using the available Resolvers
	 */
	const schema = await buildSchema({
		resolvers: [
			UserResolver
		],
		emitSchemaFile: path.resolve(__dirname, 'schema.gql')
	});

	/** Creates the Apollo server to the schema */
	const server = new ApolloServer({
		schema
	});

	const { url } = await server.listen();

	console.log(`Server running at ${url}`);
}

main();