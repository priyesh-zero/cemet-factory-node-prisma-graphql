const tBody = document.querySelector("#tableBody")
const pBody = document.querySelector('#product-info')

const getProduct = async (e) => {
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
                    }`
    const response = await useFetch(query, {id: parseInt(e.target.dataset.id)})
    const product = response.data.product
    pBody.innerHTML = ` 
        <h3>${product.name}</h3>
        <img src="${product.url}" alt="${product.name}">
        <p>${product.description}</p>
        <h4><small>Quantity: </small> ${product.quantity}</h4>
        <h4><small>Price: </small> ${product.price}</h4>
        <h4>Interested Users</h4>
        <ul>${product.interestedUser.map(user => {
        return `<li>${user.fullName} - ${user.email} - ${user.phone}</li>`
    }).join('')}</ul>
        `


}

document.addEventListener("DOMContentLoaded", async () => {
    const query = `query {
                      products{
                        id
                        name
                        description
                        quantity
                        price
                      }
                    }`
    const response = await useFetch(query)
    const html = response.data.products.map((product, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td class="product-name" data-id="${product.id}">${product.name}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        </tr>
        `
    }).join('')
    tBody.innerHTML = html
    const productTab = document.querySelectorAll('.product-name')
    productTab.forEach(tab => tab.addEventListener('click', getProduct))

})
