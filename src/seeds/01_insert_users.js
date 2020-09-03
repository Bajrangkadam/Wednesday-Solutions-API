/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([
          {
            username: 'JDoe',
            name: 'Jane Doe',
            password: '123',
            updated_at: new Date()
          },
          {
            username: 'PCallow',
            name: 'Paul Callow',
            password: '123',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
