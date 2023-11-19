const router = require('express').Router();
const createUserController = require('./controller/createUserController');

router.post('', createUserController.store);
module.exports = router;