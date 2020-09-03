require('babel-register');
require('dotenv').config({ path: __dirname + '/../.env' });
/**
 * Database configuration.
 */
console.log('ENV :',process.env.NODE_ENV);

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.MYSQL_DATABASE
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    stub: './stubs/migration.stub'
  },
  seeds: {
    directory: './seeds',
    stub: './stubs/seed.stub'
  }
};
