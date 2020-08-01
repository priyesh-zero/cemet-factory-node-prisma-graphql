import { Resolver, Mutation, Arg } from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { prisma } from "../prisma";
import { User } from "./User";

@Resolver()
export class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg("user")
        data: RegisterInput
    ): Promise<User> {
        return await prisma.user.create({ data });
    }
}
