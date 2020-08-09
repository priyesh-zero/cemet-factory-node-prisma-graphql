const loginForm = document.querySelector("#login-form");
const userDiv = document.querySelector("#user-div");
const userInfo = `{
    id
    fullName
    cartQty
  }`;

document.addEventListener("DOMContentLoaded", async () => {
    const query = `query{
  me${userInfo}
}`;
    loginForm.addEventListener("submit", login);
    const response = await useFetch(query);
    if (response.data.me) {
        handleUser(response.data.me);
    } else {
        handleNoUser();
    }
});

const handleUser = user => {
    loginForm.style.display = "none";
    userDiv.style.display = "block";
    const welcomeElem = document.createElement("h2");
    welcomeElem.innerText = user.fullName;
    const cartElem = document.createElement("button");
    cartElem.innerText = `Cart (${user.cartQty})`;
    cartElem.disabled = user.cartQty === 0;
    cartElem.addEventListener("click", moveToCart);
    const logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logout";
    logoutBtn.addEventListener("click", logout);
    userDiv.append(welcomeElem);
    userDiv.append(cartElem);
    userDiv.append(logoutBtn);
};

const handleNoUser = () => {
    loginForm.style.display = "block";
    userDiv.style.display = "none";
};

const moveToCart = () => {
    window.location.replace("/me.html");
};

const login = async event => {
    event.preventDefault();
    const variables = {
        email: loginForm.email.value,
        password: loginForm.password.value
    };

    const query = `mutation Login(
  $email: String!,
  $password: String!
) {
  login(email: $email, password: $password) ${userInfo}
}`;
    const response = await useFetch(query, variables);
    if (!response.data.login) {
        alert("Invalid Credentials!");
    }
    handleUser(response.data.login);
};

const logout = async () => {
    const query = `query {
  logout
}`;
    const response = await useFetch(query);
    if (response.data.logout) {
        handleNoUser();
    } else {
        alert("Something went wrong!");
        window.location.reload();
    }
};
