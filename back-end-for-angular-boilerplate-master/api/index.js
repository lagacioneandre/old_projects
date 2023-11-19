const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/companies', require('./companies'));
router.use('/menus', require('./menus'));
router.use('/permissions', require('./permissions'));
router.use('/users', require('./users'));
router.use('/users/companies/combo-list', require('./user-companies'));

module.exports = router;