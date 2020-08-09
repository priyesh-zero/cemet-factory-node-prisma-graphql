let CLIENT_SECRET_STRIPE = null;
let STRIPE_PUBLISHER_KEY = null;
let stripe = null;

const setSecret = secret => {
    CLIENT_SECRET_STRIPE = secret.CLIENT_SECRET;
    STRIPE_PUBLISHER_KEY = secret.STRIPE_PUBLISHER_KEY;
};

const getSecret = () => {
    console.log(CLIENT_SECRET_STRIPE);
    return CLIENT_SECRET_STRIPE;
};

const main = async () => {
    const query = `mutation {
    createPaymentIntent {
        CLIENT_SECRET
        STRIPE_PUBLISHER_KEY
    }
}`;
    const response = await useFetch(query);
    setSecret(response.data.createPaymentIntent);

    stripe = Stripe(STRIPE_PUBLISHER_KEY);
    initStripeElements();
};

main();
