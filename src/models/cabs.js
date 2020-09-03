import bookshelf from '../db';

const TABLE_NAME = 'cabs';

/**
 * cabs model.
 */
class cabs extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default cabs;
