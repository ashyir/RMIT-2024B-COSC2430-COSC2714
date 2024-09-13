const PATH = 'home';

const index = (req, res) => res.render(`${PATH}/home`, { title: 'Home' });

module.exports = { index }