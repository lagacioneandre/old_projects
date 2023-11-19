const router = require('express').Router();
const Chance = require('chance');
const chance = new Chance();
const { pagination } = require('../pagination');
const { calcTotalItems, cpfGenerator } = require('../utils');

const getRandomList = (totalItems) => {
    const items = [];

    for (let i = 0; i < totalItems; i++) {
        items.push({
            id: chance.guid(),
            name: chance.name({ middle: true }),
			login: chance.integer({ min: 10000, max: 99999 }),
			email: chance.email(),
			lastAccess: chance.timestamp(),
            company: chance.company(),
            cpf: cpfGenerator(),
            phone: chance.integer({ min: 10000000000, max: 99999999999 }),
        });
    }

    return items;
}

router.post('/', (request, response) => {
    const pageNumber = request.body.pageNumber;
    const pageSize = request.body.pageSize;
    const totalItems = calcTotalItems(pageNumber, pageSize);
    const users = getRandomList(totalItems);
    const _pagination = pagination(pageNumber, pageSize);
    _pagination.content = users;
    _pagination.number = pageNumber;
    response.json(_pagination);
});



module.exports = router;