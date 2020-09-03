/**
 * Create booking table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('booking', table => {
    table.increments();
    table.string('source');
    table.string('destination');
    table.integer('userid');
    table.string('lattitude');
    table.string('longitude');
    table.boolean('isactive');
    table.string('color');
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop booking table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('booking');
}
