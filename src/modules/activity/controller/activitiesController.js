const express = require('express');
const { body, query, validationResult } = require('express-validator');
const ActivityService = require('../service/activityService');
const SaveActivityDto = require('../dto/saveActivity.dto');
const UpdateActivityDto = require('../dto/updateActivity.dto');

const router = express.Router();
let activityService;

/**
 * Middleware to handle validation results
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 * @returns {void}
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Initializes the activity service with the database connection
 * @param {Object} connection - The TypeORM connection
 * @returns {Promise<void>}
 */
const initializeActivityService = async (connection) => {
  activityService = new ActivityService(connection);
};

/**
 * Route to search for an activity by ID
 */
router.get('/search', [
  query('id').isInt(),
  validate
], async (req, res) => {
  try {
    const result = await activityService.searchActivityById(parseInt(req.query.id));
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * Route to save a new activity
 */
router.post('/save', [
  body('title').isString(),
  body('subtitle').isString(),
  body('pending').isBoolean(),
  validate
], async (req, res) => {
  const { title, subtitle, pending } = req.body;
  const saveActivityDto = new SaveActivityDto(title, subtitle, pending);
  try {
    const result = await activityService.saveActivity(saveActivityDto);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Route to update an existing activity
 */
router.patch('/update', [
  body('id').isInt(),
  body('title').optional().isString(),
  body('subtitle').optional().isString(),
  body('pending').optional().isBoolean(),
  validate
], async (req, res) => {
  const { id, title, subtitle, pending } = req.body;
  const updateActivityDto = new UpdateActivityDto(id, title, subtitle, pending);
  try {
    const result = await activityService.updateActivity(updateActivityDto);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Route to delete an activity by ID
 */
router.delete('/delete', [
  query('id').isInt(),
  validate
], async (req, res) => {
  try {
    const result = await activityService.deleteActivity(parseInt(req.query.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { router, initializeActivityService };