import bookshelf from '../db';

const TABLE_NAME = 'booking';

/**
 * Booking model.
 */
class Booking extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Booking;
