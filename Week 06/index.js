const frmAddProduct = document.getElementById('frm-add-product')

window.onload = loadProductFromDB
frmAddProduct.onsubmit = addProduct

function addProduct(e) {
    e.preventDefault();

    let product = {}

    product.name = document.getElementById('product-name').value
    product.price = parseFloat(document.getElementById('product-price').value)
    product.quantity = parseInt(document.getElementById('product-quantity').value)

    if (product.name === '' || isNaN(product.price) || isNaN(product.quantity))
        return

    loadProductIntoTable(product)
    saveProductToDB(product)
    showMessage()

    frmAddProduct.reset()
}

function showMessage() {
    const message = document.getElementById('message')

    message.style.display = 'block'

    setTimeout(() => message.style.display = 'none', 2000)
}

function loadProductIntoTable(product) {
    const table = document.getElementById('table-product').getElementsByTagName('tbody')[0]

    const newRow = table.insertRow()   // <tr></tr>

    const col1 = newRow.insertCell(0) // <tr><td></td></tr>
    const col2 = newRow.insertCell(1) // <tr><td></td><td></td></tr>
    const col3 = newRow.insertCell(2) // <tr><td></td><td></td><td></td></tr>
    const col4 = newRow.insertCell(3) // <tr><td></td><td></td><td></td><td></td></tr>

    const amount = product.price * product.quantity

    col1.innerHTML = product.name      // <tr><td>name</td><td></td><td></td><td></td></tr>
    col2.innerHTML = product.price     // <tr><td>name</td><td>price</td><td></td><td></td></tr>
    col3.innerHTML = product.quantity  // <tr><td>name</td><td>price</td><td>quantity</td><td></td></tr>
    col4.innerHTML = amount            // <tr><td>name</td><td>price</td><td>quantity</td><td>amount</td></tr>
}

function saveProductToDB(product) {
    let products = JSON.parse(localStorage.getItem('products')) || []

    products.push(product)

    localStorage.setItem('products', JSON.stringify(products))
}

function loadProductFromDB() {
    const products = JSON.parse(localStorage.getItem('products')) || []

    products.forEach(product => loadProductIntoTable(product))
}