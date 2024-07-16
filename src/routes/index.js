/* eslint-disable new-cap */
const {Router} = require('express');
const router = Router();
const provincesGet = require('./provinces/provinces_get.js');
const usersPost = require('./users/users-post.js');
const usersDelete = require('./users/users-delete.js');
const usersPut = require('./users/users-put.js');
const phoneNumbersPost = require('./phone_numbers/phoneNumbers-post.js');

//* Obtener todas las provincias
router.use( '/provincias', provincesGet );


//* Post de usuario
router.use( '/usuarios', usersPost );


//* Delete de usuario
router.use( '/usuarios', usersDelete );


//* Put de usuarios
router.use( '/usuarios', usersPut );


//* Post de teléfonos
router.use( '/telefonos', phoneNumbersPost );


module.exports = router;
