import Boom from 'boom';
import cabs from '../models/cabs';
import bookCap from '../models/booking';
import { resolve, promises } from 'dns';
import { rejects } from 'assert';

/**
 * Get all free cabs.
 * @return {Promise}
 */
export function getAllNearByCabs() {
  return cabs.query('where', 'isbooked', '=', '0').fetchAll()
    .then(cabs => {
      if (!cabs) {
        throw new Boom.notFound('cabs not found.');
      }
      return cabs;
    });
}

/**
 * Book cab.
 * @param  {Object}  reqData
 * @return {Promise}
 */
export function bookCab(reqData,loginId) {
  if (reqData.lattitude && reqData.longitude && !isNaN(reqData.lattitude) && !isNaN(reqData.longitude)) {
    let lattitude = parseInt(reqData.lattitude);
    let longitude = parseInt(reqData.longitude);
    let userLocation = {
      lattitude: lattitude,
      longitude: longitude
    };
    let color = reqData.color || null, parseData = null;
    return getClosestCab(userLocation, color)
      .then(cab => {
        if (cab) {
          parseData = JSON.parse(JSON.stringify(cab));
          parseData.source = reqData.source;
          parseData.destination = reqData.destination;
          //update flag booked cab
          return Promise.all([updateBookedCab(parseData.id), addBookingDetail(parseData,loginId)]);
        } else {
          return {
            code: 400,
            message: "No cabs available!"
          };
        }
      }).then(result => {
        if (parseData) {
          parseData.isBooked = true;
          return {
            code: 200,
            message: "Cab booked!",
            cabID: parseData.id,
            driverName: parseData.driverName,
            driverNumber: parseData.driverNumber,
            location: parseData.location
          };
        } else {
          return result;
        }
      }).catch(err => {
        return {
          code: 400,
          message: err.message
        };
      });
  } else {
    return {
      code: 400,
      message: "Invalid/Missing parameters"
    };
  }
}

/**
 * Update a cab details.
 * @param  {Number}  id
 * @return {Promise}
 */
export function updateBookedCab(id) {
  return new cabs({ id }).save({ isbooked: 1 }).then(cab => cab.refresh());
};

/**
 * Add booking detail.
 *
 * @param  {Object} bookData
 * @return {Promise}
 */
export function addBookingDetail(bookData,loginId) {
  return new bookCap({
    source: bookData.source, destination: bookData.destination, userid: loginId,
    lattitude: bookData.lattitude, longitude: bookData.longitude, isactive: 1, color: bookData.color
  }).save().then(cab => cab.refresh());
};

/**
 * Get all booked cabs.
 * @return {Promise}
 */
export function getAllBookHistory(userid) {
  return bookCap.query('where', 'userid', '=', userid).fetchAll()
    .then(cabs => {
      if (!cabs) {
        throw new Boom.notFound('cabs not found.');
      }
      return cabs;
    });
};

/**
 * Get distance between two location.
 * @param {Object} location1
 * @param {Object} location2
 * @return {Number}
 */
let getDistance = (location1, location2) => {
  var a = location1.lattitude - location2.lattitude;
  var b = location1.longitude - location2.longitude;
  var c = Math.sqrt(a * a + b * b);
  return c;
};

/**
 * Get closest cab base on location.
 * @param {Object} location
 * @param {String} color
 * @return {promises}
 */
let getClosestCab = (location, color) => new Promise((resolve, reject) => {
  var closest = null, count = 0;
  var closestDistance = Infinity;
  getAllNearByCabs().then(cabs => {
    cabs.forEach((cab) => {
      count++;
      if (!cab.isBooked) {
        let parseData = JSON.parse(JSON.stringify(cab));
        let cabLocation = { lattitude: parseData.lattitude, longitude: parseData.longitude };
        if (color) {
          if (color.toUpperCase() == parseData.color) {
            let distance = getDistance(cabLocation, location);
            if (distance < closestDistance) {
              closestDistance = distance;
              closest = cab;
            }
          }
        } else {
          let distance = getDistance(cabLocation, location);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = cab;
          }
        }
      }
    });
    if (count == cabs.length)
      return resolve(closest);
  }).catch(err => {
    return reject(err);
  });
});

