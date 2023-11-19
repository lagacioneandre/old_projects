const router = require('express').Router();
const Chance = require('chance');
const chance = new Chance();

const getRandomList = () => {
    const items = [];

    for (let i = 0; i < 10; i++) {
        items.push({
            id: chance.guid(),
            name: chance.company()
        });
    }

    return items;
}

router.get('/', (request, response) => {
    const companies = getRandomList();
    response.json(companies);
});



module.exports = router;