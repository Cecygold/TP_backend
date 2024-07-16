
require('dotenv').config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const seed = require("./src/seeds/index.js");

// Syncing all the models at once.
conn.sync() // Sync sin force:true para mantener la base de datos existente
	// .then(() => {
	// 	return seed(); // Ejecutar la semilla (únicamente la primera vez que levanta el servidor) para inicializar datos
	// })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`%s listening at ${PORT}`, 'server'); // eslint-disable-line no-console
		});
	});


//! Activar para pruebas -> Borra db y levanta de cero.
// conn.sync({force:true})
// 	.then(() => {
// 		return seed();
// 	})
// 	.then(() => {
// 		server.listen(PORT, () => {
// 			console.log(`%s listening at ${PORT}`,'server'); // eslint-disable-line no-console
// 		});
// 	});



