const tBody = document.querySelector("#tableBody")

document.addEventListener("DOMContentLoaded", async () => {
    const query = `query{
  users{
    id
    fullName
    email
    phone
  }
}`
    const response = await useFetch(query)
    console.log(response.data.users)
    const html = response.data.users.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        </tr>
        `).join('')
    tBody.innerHTML = html
})
