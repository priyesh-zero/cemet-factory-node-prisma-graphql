import { Resolver, Query, Ctx } from "type-graphql";
import { prisma } from "../prisma";
import { User } from "./User";
import { Context } from "src/types/Context";

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: Context): Promise<User | null> {
        if (!ctx.req.session || !ctx.req.session.userId) {
            return null;
        }

        const user = await prisma.user.findOne({
            where: { id: ctx.req.session.userId }
        });

        if (!user) {
            return null;
        }

        return user;
    }
}
