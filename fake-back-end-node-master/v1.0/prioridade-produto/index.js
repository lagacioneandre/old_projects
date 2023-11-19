const router = require('express').Router()
	, Chance = require('chance')
	, chance = new Chance()
	, { defaultListResponse } = require('../../util')
	, unidadeNegocio = require('../unidadeNegocio');

let idUnidadeNegocio = null;

const getItinerariosList = () => {
	const list = [];
	for (let index = 0; index < 10; index++) {
		list.push({
			id: chance.hash(),
			unidadeNegocioId: idUnidadeNegocio,
			unidadeNegocio: '',
			produto: chance.sentence({ words: 3 }),
			codigoSap: chance.integer({ min: 1000, max: 9999 }),
			dataInicio: chance.date(),
			dataFim: chance.date(),
			ativo: chance.bool()
		});
	}

	return list;
};

router.get('/', (_, response) => {
	idUnidadeNegocio =_.query.unidadeNegocio;
	const itemList = getItinerariosList();
	const responseContent = defaultListResponse(itemList);
	response.json(responseContent);
});

router.get('/count', (request, response) => {
	const count = chance.integer({ min: 15, max: 150 });
	response.json({ count });
});

module.exports = router;
