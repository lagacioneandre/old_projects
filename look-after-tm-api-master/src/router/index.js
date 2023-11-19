const router = require('express').Router();

router.use('/products', require('../product'));
router.use('/create-user', require('../create-user'));
router.use('/login', require('../login'));

module.exports = router;