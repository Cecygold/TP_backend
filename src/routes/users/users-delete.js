
const { Router } = require('express');
const router = Router();
const { usersDeleteUser } = require('../../middleware/middleware_users.js');


//* Borrado de cuenta 
router.delete( '/borrar', usersDeleteUser );


module.exports = router;