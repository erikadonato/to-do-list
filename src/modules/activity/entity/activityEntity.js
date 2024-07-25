const { EntitySchema } = require('typeorm');

/**
 * @typedef {Object} Activity
 * @property {number} id - The unique identifier for the activity
 * @property {string} title - The title of the activity
 * @property {string} subtitle - The subtitle of the activity
 * @property {boolean} pending - The status of the activity
 */

module.exports = new EntitySchema({
  name: 'Activity',
  tableName: 'activities',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    subtitle: {
      type: 'varchar',
    },
    pending: {
      type: 'boolean',
    },
  },
});
