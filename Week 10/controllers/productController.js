const PATH = 'product';
const Products = require('../models/product');

const details = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = Products.find(p => p.id === productId);

    if (product) {
        res.render(`${PATH}/product`, { title: 'Product Details', product });
    } else {
        res.status(404).render('404', { title: '404 Not Found' });
    }
}

const search = (req, res) => {
    const searchTerm = req.query.name ? req.query.name.toLowerCase() : '';

    const filteredProducts = Products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    res.render(`${PATH}/search`, { title: 'Search Product', products: filteredProducts });
}

module.exports = { details, search };