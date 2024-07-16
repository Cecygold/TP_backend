
const { Router } = require('express');
const router = Router();
const { phoneNumbersAddNumber } = require('../../middleware/middleware_phoneNumbers.js');


//* Agregar un nuevo teléfono
router.post( '/agregar', phoneNumbersAddNumber );


module.exports = router;