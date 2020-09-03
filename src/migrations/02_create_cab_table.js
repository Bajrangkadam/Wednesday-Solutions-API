/**
 * Create booking table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('cabs', table => {
    table.increments();
    table.string('driverName');
    table.string('driverNumber');
    table.string('lattitude');
    table.string('longitude');
    table.boolean('isbooked');
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
  return knex.schema.dropTable('cab');
}
