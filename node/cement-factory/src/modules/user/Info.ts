import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";
import { User } from "./User";
import { prisma } from "../prisma";
// import {Product} from "../product/Product";
import { Cart } from "../cart/Cart";

@Resolver(User)
export class InfoResolver {
    @FieldResolver(() => [Cart])
    async cartItems(@Root() user: User): Promise<Cart[]> {
        return await prisma.user
            .findOne({ where: { id: user.id } })
            .Cart({ include: { product: true } });
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await prisma.user.findMany({});
    }

    @Query(() => User, { nullable: true })
    async getUser(
        @Arg("email", { nullable: true }) email: string,
        @Arg("id", { nullable: true }) id: number
    ): Promise<User | null> {
        if (id) {
            return await prisma.user.findOne({ where: { id } });
        }

        if (email) {
            return await prisma.user.findOne({ where: { email } });
        }

        return null;
    }
}
