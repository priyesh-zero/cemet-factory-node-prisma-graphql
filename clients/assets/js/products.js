const tBody = document.querySelector("#tableBody");
const pBody = document.querySelector("#product-info");
const form = document.querySelector("#product-form");

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
        name: form.productName.value,
        description: form.productDescription.value,
        quantity: parseFloat(form.productQuantity.value),
        price: parseFloat(form.productPrice.value)
    };

    const operations = {
        query:
            "mutation CreateProduct(  $data:ProductInput!,$image:Upload ){  createProduct(    data: $data, image: $image  ) {    id   name\n    description\n    quantity\n    price\n url\n  }\n}\n",
        variables: { data, image: null }
    };
    console.log(JSON.stringify(operations));
    const formData = new FormData();
    formData.append("operations", JSON.stringify(operations));
    if (form.productImage.files.length > 0) {
        formData.append("map", `{ "0": ["variables.image"] }`);
        formData.append("0", form.productImage.files[0]);
    } else {
        formData.append("map", "{}");
    }
    try {
        const response = await useFetchMulti(formData);
        if (response) {
            if (response.hasOwnProperty("errors")) {
                throw new Error(response.errors);
            }
            form.reset();
            const product = response.data.createProduct;
            const indexTD = document.createElement("td");
            indexTD.innerHTML =
                document.querySelectorAll(".product-name").length + 1;
            const nameTD = document.createElement("td");
            nameTD.innerHTML = product.name;
            nameTD.classList.add("product.name");
            nameTD.dataset.id = product.id;
            nameTD.addEventListener("click", getProduct);
            const descTD = document.createElement("td");
            descTD.innerHTML = product.description;
            const qtyTD = document.createElement("td");
            qtyTD.innerHTML = product.quantity;
            const priceTD = document.createElement("td");
            priceTD.innerHTML = product.price;
            const TR = document.createElement("tr");
            TR.append(indexTD);
            TR.append(nameTD);
            TR.append(descTD);
            TR.append(qtyTD);
            TR.append(priceTD);

            tBody.append(TR);
        } else {
            alert("Product not added");
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
});

const getProduct = async e => {
    const query = `query GetProduct($id:Float!){
                      product(id: $id) {
                        name
                        description
                        quantity
                        price
                        url
                        interestedUser{
                          fullName
                          email
                          phone
                        }
                      }
                    }`;
    const response = await useFetch(query, {
        id: parseInt(e.target.dataset.id)
    });
    const product = response.data.product;
    pBody.innerHTML = ` 
        <h3>${product.name}</h3>
        <img src="${product.url}" alt="${product.name}">
        <p>${product.description}</p>
        <h4><small>Quantity: </small> ${product.quantity}</h4>
        <h4><small>Price: </small> ${product.price}</h4>
        <h4>Interested Users</h4>
        <ul>${product.interestedUser
            .map(user => {
                return `<li>${user.fullName} - ${user.email} - ${user.phone}</li>`;
            })
            .join("")}</ul>
        `;
};

document.addEventListener("DOMContentLoaded", async () => {
    const query = `query {
                      products{
                        id
                        name
                        description
                        quantity
                        price
                      }
                    }`;
    const response = await useFetch(query);
    const html = response.data.products
        .map((product, index) => {
            return `
        <tr>
            <td>${index + 1}</td>
            <td class="product-name" data-id="${product.id}">${
                product.name
            }</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        </tr>
        `;
        })
        .join("");
    tBody.innerHTML = html;
    const productTab = document.querySelectorAll(".product-name");
    productTab.forEach(tab => tab.addEventListener("click", getProduct));
});
