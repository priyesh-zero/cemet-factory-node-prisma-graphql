const tBody = document.querySelector("#tableBody")
const pBody = document.querySelector('#product-info')

const getCart = async (e) => {
    const query = `query GetUsers($id:Float){
  getUser(id: $id) {
    email
    fullName
    phone
    cartItems{
      quantity
      product{
        id
        name
      }
    }
  }
}`
    const response = await useFetch(query, {id: parseInt(e.target.dataset.id)})
    const user = response.data.getUser
    pBody.innerHTML = ` 
        <h3>${user.fullName}</h3>
        <p>${user.email} - ${user.phone}</p>
        <h4>Cart Items</h4>
        <ul>${user.cartItems.map(ci => `
            <li>Name: ${ci.product.name} | Quantity: ${ci.quantity}</li>
        `).join('')}</ul>
        `


}

document.addEventListener("DOMContentLoaded", async () => {
    const query = `query{
                      users{
                        id
                        fullName
                        cartQty
                      }
                    }`
    const response = await useFetch(query)
    const html = response.data.users.map((user, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td class="user-name" data-id="${user.id}">${user.fullName}</td>
            <td>${user.cartQty}</td>
        </tr>
        `
    }).join('')
    tBody.innerHTML = html
    const productTab = document.querySelectorAll('.user-name')
    productTab.forEach(tab => tab.addEventListener('click', getCart))

})
