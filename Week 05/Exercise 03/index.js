let cart = [];

function add_to_cart() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);

    if (!name || isNaN(price) || price < 0) {
        alert("Please enter a valid product name and price.");
        return;
    }

    const product = {
        name: name,
        price: price
    };

    cart.push(product);

    let total = 0;
    for (let p of cart) {
        total += p.price;
    }

    document.getElementById('cart_total').textContent = `Total cart value: $${total.toFixed(2)}`;
}