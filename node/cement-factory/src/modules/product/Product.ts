import { ObjectType, Field, Root, ID } from "type-graphql";

@ObjectType()
export class Product {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    quantity: number;

    @Field()
    price: number;

    @Field()


    image: string;

    @Field()
    url?(@Root() parent: Product): string {
        return `${"http://127.0.0.1/images/"}${parent.image}`;
    }

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
