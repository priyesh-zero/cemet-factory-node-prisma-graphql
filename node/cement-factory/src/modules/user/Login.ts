import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "./User";
import { prisma } from "../prisma";
import { Context } from "src/types/Context";

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email")
        email: string,
        @Arg("password")
        password: string,
        @Ctx() ctx: Context
    ): Promise<User | null> {
        const user = await prisma.user.findOne({ where: { email } });

        if (!user) return null;

        if (user.password === password) {
            ctx.req.session!.userId = user.id;
            return user;
        } else {
            return null;
        }
    }
}
