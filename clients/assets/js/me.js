const userDiv = document.querySelector("#user-div");

const userInfo = `{
    id
    fullName
    cartQty
    cartItems {
        quantity
        product {
            name
            price
        }
    }
  }`;

const createContent = user => {
    const userH = document.createElement("h3");
    userH.innerText = `Welcome ${user.fullName}`;
    const uList = document.createElement("ul");
    let sum = 0;
    user.cartItems.forEach(ci => {
        const price = parseInt(ci.product.price) * parseInt(ci.quantity);
        sum += price;
        const lList = document.createElement("li");
        lList.innerHTML = `<span>Name: ${
            ci.product.name
        } <br /> Item Price: Rs. ${parseInt(ci.product.price).toFixed(
            2
        )}</span><span>Quantity: ${
            ci.quantity
        }</span><span>Price: Rs. ${price.toFixed(2)}</span>`;
        uList.append(lList);
    });
    const buyButton = document.createElement("button");
    buyButton.innerText = `Buy (Rs. ${sum})`;
    buyButton.addEventListener("click", checkout);
    userDiv.append(userH);
    userDiv.append(uList);
    userDiv.append(buyButton);
};

const checkout = () => {
    window.location.replace("/checkout.html");
};

const mainFunc = async () => {
    const query = `query{
  me${userInfo}
}`;
    const response = await useFetch(query);
    if (response.data.me) {
        createContent(response.data.me);
    } else {
        window.location.replace("/");
    }
};

document.addEventListener("DOMContentLoaded", mainFunc);
