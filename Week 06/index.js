document.getElementById('frm-add-product').onsubmit = addProduct

function addProduct(e) {
    e.preventDefault();

    let product = {}
    product.name = document.getElementById('product-name').value
    product.price = parseFloat(document.getElementById('product-price').value)
    product.quantity = parseInt(document.getElementById('product-quantity').value)
    product.amount = product.price * product.quantity

    const table = document.getElementById('table-product').getElementsByTagName('tbody')[0]

    const new_row = table.insertRow() // <tr></tr>
    const col_1 = new_row.insertCell(0) // <tr><td></td></tr>
    const col_2 = new_row.insertCell(1) // <tr><td></td><td></td></tr>
    const col_3 = new_row.insertCell(2) // <tr><td></td><td></td><td></td></tr>
    const col_4 = new_row.insertCell(3) // <tr><td></td><td></td><td></td><td></td></tr>

    col_1.innerHTML = product.name // <tr><td>name</td><td></td><td></td><td></td></tr>
    col_2.innerHTML = product.price
    col_3.innerHTML = product.quantity
    col_4.innerHTML = product.amount

    save_product(product)
    show_message()
}

function show_message() {
    const message = document.getElementById('message')
    message.style.display = 'block'

    setTimeout(() => {
        message.style.display = 'none'
    }, 2000)
}

function save_product(product) {
    let products = JSON.parse(localStorage.getItem('products')) || []
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products))
}

function load_product() {
    let products = JSON.parse(localStorage.getItem('products')) || []

    const table = document.getElementById('table-product').getElementsByTagName('tbody')[0]

    for (const product of products) {
        const new_row = table.insertRow() // <tr></tr>
        const col_1 = new_row.insertCell(0) // <tr><td></td></tr>
        const col_2 = new_row.insertCell(1) // <tr><td></td><td></td></tr>
        const col_3 = new_row.insertCell(2) // <tr><td></td><td></td><td></td></tr>
        const col_4 = new_row.insertCell(3) // <tr><td></td><td></td><td></td><td></td></tr>

        col_1.innerHTML = product.name // <tr><td>name</td><td></td><td></td><td></td></tr>
        col_2.innerHTML = product.price
        col_3.innerHTML = product.quantity
        col_4.innerHTML = product.amount
    }
}

window.onload = load_product