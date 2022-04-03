import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";

import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from "../repositories/UserRepository";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { AuthUserInput } from "../inputs/AuthUserInput";
import { User } from "../models/User";
import { isAuth } from "../middlewares/isAuth";
import { AuthContext } from "../contexts/AuthContext";


@ObjectType()
class AuthUserResponse {
	@Field()
	accessToken: string;
}

@ObjectType()
class DeleteUserResponse {
	@Field()
	success: string;
}

@Resolver()
export class UserResolver {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	/**
	 *  Returns the current logged user's data
	 */
	@Query(() => User)
	@UseMiddleware(isAuth)
	async me(@Ctx() { user }: AuthContext) {
		return user;
	}

	/**
	 * Creates a new user
	 * @returns User
	 */
	@Mutation(() => User)
	async createUser(
		@Arg('data') { username, password }: CreateUserInput
	) {
		const userAlreadyExists = await this.userRepository.findByUsername(username);
		if (userAlreadyExists)
			throw new Error('User already exists');

		const user = this.userRepository.create({ username, password })
		return user;
	}

	@Mutation(() => AuthUserResponse)
	async authUser(
		@Arg('data') { username, password }: AuthUserInput
	) {
		const user = await this.userRepository.findByUsername(username);

		if (!user)
			throw new Error('Incorrect username/password');

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch)
			throw new Error('Incorrect username/password');

		if (!process.env.JWT_PRIVATE_KEY)
			throw new Error('JWT not configured, the authentication has failed');

		return {
			accessToken: sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY, {
				expiresIn: "7d",
			})
		};
	}

	/**
	 * Deletes an authenticated user's task by id
	 * @returns Task
	 */
	@Mutation(() => DeleteUserResponse)
	@UseMiddleware(isAuth)
	async deleteUser(
		@Ctx() { user }: AuthContext
	) {
		return {
			success: await this.userRepository.delete(user.id)
		};
	}

}