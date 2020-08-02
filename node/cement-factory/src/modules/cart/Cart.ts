import { ObjectType, Field } from "type-graphql";
import { Product } from "../product/Product";
import { User } from "../user/User";

@ObjectType()
export class Cart {
    @Field()
    quantity: number;

    @Field()
    product?: Product;

    @Field()
    user?: User;
}
