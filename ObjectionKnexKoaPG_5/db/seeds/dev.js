/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	await knex.raw('TRUNCATE TABLE "books" CASCADE');
  	await knex('books').insert([
		{
			id: 1,
			author: "Phenimor Kuper",
			title: "Zveroboi",
			year: 1896
		},
		{
			id: 2,
			author: "Phenimor Kuper",
			title: "Sledopit",
			year: 1896
		}
 	]);
};
