const { createConnection } = require('typeorm');
const Activity = require('../modules/activity/entity/activityEntity');

const databaseConfig = async () => {
  return createConnection({
    type: 'sqlite',
    database: 'dbActivities.sqlite',
    entities: [Activity],
    synchronize: true,
    extra: {
      connectionLimit: 10,
    },
    pool: {
      max: 5,
      min: 1,
      idleTimeoutMillis: 30000,
      acquireTimeoutMillis: 30000,
    },
  });
};

module.exports = databaseConfig;
