/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('cabs')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('cabs').insert([
          {
            driverName: 'driver 1',
            driverNumber: '0000000001',
            lattitude: '0',
            longitude: '0',
            isBooked: false,
            color: "WHITE"
          },
          {
            driverName: "driver 2",
            driverNumber: "0000000002",
            lattitude: 10,
            longitude: 10,
            isBooked: false,
            color: "PINK"
          },
          {
            driverName: "driver 3",
            driverNumber: "0000000003",
            lattitude: 10,
            longitude: 20,
            isBooked: false,
            color: "PINK"
          },
          {
            driverName: "driver 4",
            driverNumber: "0000000004",
            lattitude: 20,
            longitude: 10,
            isBooked: false,
            color: "WHITE"
          },
          {
            driverName: "driver 5",
            driverNumber: "0000000005",
            lattitude: 20,
            longitude: 20,
            isBooked: false,
            color: "WHITE"
          }
        ])
      ]);
    });
}
