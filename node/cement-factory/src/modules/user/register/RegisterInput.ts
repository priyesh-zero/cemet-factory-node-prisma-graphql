import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailUnique } from "./IsEmailUnique";

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
    @IsEmailUnique({ message: "Provided email already in use" })
    email: string;

    @Field()
    @Length(3, 25)
    firstName: string;

    @Field()
    @Length(3, 25)
    lastName: string;

    @Field()
    @Length(10)
    phone: string;

    @Field()
    @Length(8)
    password: string;
}
