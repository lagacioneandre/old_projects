const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance();

router.get('/', (_, response) => {
	const empresas = [{
		description: 'Motorola',
		id: 'GR00000001',
		imageName: 'motorola'
	}, {
		description: 'Apple',
		id: 'GR00000002',
		imageName: 'apple'
	}, {
		description: 'P&G',
		id: 'GR00000003',
		imageName: 'p&g'
	}, {
		description: 'BMW',
		id: 'GR00000004',
		imageName: 'bmw'
	}, {
		description: 'Shell',
		id: 'GR00000005',
		imageName: 'shell'
	}];

	response.json(empresas);
});

module.exports = router;
