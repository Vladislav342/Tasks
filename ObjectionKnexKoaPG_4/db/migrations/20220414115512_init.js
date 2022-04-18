/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  	.createTable('books', (table) => {
  		table.increments('id');
  		table.string('author', 255).notNullable();
  		table.string('title', 255).notNullable();
  		table.integer('year').notNullable();
  		table.timestamps(true, true);
  	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
