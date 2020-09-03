import Boom from 'boom';
import User from '../models/user';
import * as authRoutes from '../authRoutes.js';

/**
 * Get a user.
 *
 * @param  {String}  name
 * @param  {String}  password
 * @return {Promise}
 */
export function login(username, password) {
  return new User({ username: username, password: password }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('Invalid credentials');
    }
    let parseData = JSON.parse(JSON.stringify(user));
    let token = authRoutes.tokenGeneration({ id: parseData.id, username: parseData.username });
    parseData.token=token;
    return parseData;
  });
}

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }
    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  return new User({ name: user.name }).save().then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name }).then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
