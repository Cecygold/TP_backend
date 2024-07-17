
require('dotenv').config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const seed = require("./src/seeds/index.js");
const { PROVINCES } = conn.models;

//! Usar durante desarrollo, para pruebas -> Borra db y levanta de cero.
// conn.sync({force:true})
// 	.then(() => {
// 		return seed();
// 	})
// 	.then(() => {
// 		server.listen(PORT, () => {
// 			console.log(`%s listening at ${PORT}`,'server'); // eslint-disable-line no-console
// 		});
// 	});

//! Usar para despliegue 
(async () => {
	try {
		await conn.sync();
		let provincias = await PROVINCES.findAll();
		if (provincias.length === 0) {
			await seed();
		}
		server.listen(PORT, () => {
			console.log(`%s listening at ${PORT}`, 'server');
		});
	} catch (error) {
		console.error('Error during initialization:', error);
	}
})();


