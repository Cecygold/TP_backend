
const { Router } = require('express');
const router = Router();
const { usersPutValidUntil } = require('../../middleware/middleware_users.js');


//* Actualizar tiempo de logeo
router.put( '/actualizar', usersPutValidUntil );


module.exports = router;