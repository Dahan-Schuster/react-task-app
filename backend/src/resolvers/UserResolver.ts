import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'crypto';

import { User } from "../models/User";

@Resolver()
export class UserResolver {
    
    /**
     * The data which this resolver will be handling
     */
    private data: User[] = []; // list of users

    /**
     * Fetches all the users
     * @returns User[]
     */
    @Query(() => [User])
    async users() {
        return this.data;
    }   

    /**
     * Creates a new user
     * @returns User
     */
    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string
    ) {
        const user = { id: crypto.randomUUID(), name }

        this.data.push(user);

        return user;
    }

}