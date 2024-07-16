
const { Router } = require('express');
const router = Router();
const { provincesGetAll } = require('../../middleware/middleware_provinces.js');

//* Devuelve todas las provincias con su name y short_name
router.get( '/', provincesGetAll );

module.exports = router;
