const db = require('../../mongo-config');
const schema = require('../schema');
const model = db.model('products', schema, 'products', true);

module.exports = {
    async show(request, response) {
        const products = await model.find().sort([['name']]).lean().exec();
        response.setHeader('Content-Type', 'application/json');
        response.json(products);
        return false;
    }
};