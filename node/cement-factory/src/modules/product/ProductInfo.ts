import {Resolver, FieldResolver, Root, Query, Arg} from "type-graphql";
import {Product} from "./Product";
import {User} from "../user/User";
import {prisma} from "../prisma";
import {Cart} from "../cart/Cart";

@Resolver(Product)
export class ProductInfoResolver {

    @FieldResolver(() => [User])
    async interestedUser(@Root() product: Product): Promise<User[]> {
        const interestedUser: Cart[] = await prisma.product.findOne({ where: { id: product.id } }).interestedUser({ include: { user: true } })
        return Promise.resolve(interestedUser.map(cart => cart.user!))
    }
    
    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return await prisma.product.findMany({})
    }

    @Query(() => Product, { nullable: true })
    async product( @Arg("id") id: number ): Promise<Product | null> {
        return await prisma.product.findOne({ where: { id } })
    }

}
