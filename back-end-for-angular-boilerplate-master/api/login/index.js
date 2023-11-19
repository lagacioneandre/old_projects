const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance();

router.post('/', (_, response) => {
	response.json({ uuid: chance.hash({length: 25})});
});

module.exports = router;
