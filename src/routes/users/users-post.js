
const { Router } = require('express');
const router = Router();
const { usersPostNew, usersPostLogin } = require('../../middleware/middleware_users.js');


//* Crea un nuevo usuario
router.post( '/crear', usersPostNew );


//* Logeo de usuario
router.post( '/login', usersPostLogin );


module.exports = router;
