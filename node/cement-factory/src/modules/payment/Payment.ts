import { Resolver, Mutation, Field, ObjectType } from "type-graphql";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-03-02"
});

@ObjectType()
class StripeResponse {
    @Field()
    CLIENT_SECRET: String;

    @Field()
    STRIPE_PUBLISHER_KEY: String;
}

@Resolver()
export class PaymentResolver {
    @Mutation(() => StripeResponse)
    async createPaymentIntent(): Promise<StripeResponse> {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2510,
            currency: "inr",
            metadata: { integration_check: "accept_a_payment" }
        });
        const response = new StripeResponse();
        response.CLIENT_SECRET = paymentIntent.client_secret!;
        response.STRIPE_PUBLISHER_KEY = process.env.STRIPE_PUBLISHER_KEY!;
        return Promise.resolve(response);
    }
}
