require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const { router: activityRouter, initializeActivityService } = require('./src/modules/activity/controller/activitiesController');
const databaseConfig = require('./src/database/databaseconfig');

const app = express();
app.use(bodyParser.json());

databaseConfig().then(async (connection) => {
  await initializeActivityService(connection);

  app.use('/activity', activityRouter);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => console.log('TypeORM connection error: ', error));
