import { InputType, Field } from "type-graphql";
import { Min, Length } from "class-validator";

@InputType()
export class ProductInput {
    @Field()
    @Length(3, 25)
    name: string;

    @Field()
    description: string;

    @Field()
    @Min(1)
    price: number;

    @Field()
    @Min(1)
    quantity: number;

    image: string = "default.jpg";
}
