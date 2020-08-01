import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phone: string;

    @Field()
    fullName?(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    password: string;
}
//    email        String @unique
// firstName    String
// lastName     String
// phone        String
// password     String
