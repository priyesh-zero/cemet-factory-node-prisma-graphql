import { prisma } from "./modules/prisma";

const main = async () => {
    const { user, product, cartItem } = prisma;
    // const userOne = await user.findOne({
    //     where: { email: "user.one@test.com" }
    // });
    // const userTwo = await user.findOne({
    //     where: { email: "user.two@test.com" }
    // });
    // const userThree = await user.findOne({
    //     where: { email: "user.three@test.com" }
    // });

    // const users = await user.findMany({});
    const userFive = await user
        .findOne({
            where: { email: "user.five@test.com" }
        })
        .Cart({ include: { product: true } })
        .then(value =>
            value.map(v => ({ qty: v.quantity, product: v.product }))
        );

    const products = await product.findMany({});
    const cartItems = await cartItem.findMany({});

    // console.log(userOne?.email);
    // console.log(userTwo?.email);
    // console.log(userThree?.email);
    console.log(products);
    console.log(cartItems);
    console.log(userFive);
    console.log(await product.findOne({ where: { id: 1 } }).interestedUser({ include: { user: true } }))
};

main()
    .catch(err => console.error("Main Error", err.message))
    .finally(() => prisma.disconnect());
