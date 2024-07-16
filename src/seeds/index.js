
const provinces = require('./seeds_provinces.js');

module.exports = async function () {
	await Promise.all([
		await provinces()
	])
	// .then(async () => {
	//  	await otroSeeder()
	//  })

	.then(()=>{
		console.log('********** Successfully seeded DB **********');
	})
		
}