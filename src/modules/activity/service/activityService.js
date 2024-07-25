require('reflect-metadata');
const { getRepository } = require('typeorm');
const Activity = require('../entity/activityEntity');

/**
 * Service to manage activities
 */
class ActivityService {
  /**
   * Creates an instance of ActivityService.
   * @param {Object} connection - The TypeORM connection
   */
  constructor(connection) {
    this.activityRepository = connection.getRepository(Activity);
  }

  /**
   * Searches for an activity by ID.
   * @param {number} id - The ID of the activity to search for
   * @returns {Promise<{statusCode: number, message: string, data: Activity}>} - The found activity
   * @throws {Error} - If the activity is not found
   */
  async searchActivityById(id) {
    const activity = await this.activityRepository.findOne(id);
    if (!activity) {
      throw new Error(`Activity with id ${id} not found in database`);
    }
    return {
      statusCode: 200,
      message: 'Success in the search for the activity',
      data: activity,
    };
  }

  /**
   * Saves a new activity.
   * @param {Object} activityData - The data for the activity to save
   * @param {string} activityData.title - The title of the activity
   * @param {string} activityData.subtitle - The subtitle of the activity
   * @param {boolean} activityData.pending - The status of the activity
   * @returns {Promise<{statusCode: number, message: string, id: number}>} - The result of the save operation
   */
  async saveActivity({ title, subtitle, pending }) {
    const activity = this.activityRepository.create({ title, subtitle, pending });
    await this.activityRepository.save(activity);
    return { statusCode: 200, message: 'Successfully created activity', id: activity.id };
  }

  /**
   * Updates an existing activity.
   * @param {Object} activityData - The data for the activity to update
   * @param {number} activityData.id - The ID of the activity
   * @param {string} activityData.title - The title of the activity
   * @param {string} activityData.subtitle - The subtitle of the activity
   * @param {boolean} activityData.pending - The status of the activity
   * @returns {Promise<{statusCode: number, message: string}>} - The result of the update operation
   * @throws {Error} - If the activity is not found
   */
  async updateActivity({ id, title, subtitle, pending }) {
    const activity = await this.searchActivityById(id);
    if (!activity) {
      throw new Error(`Activity with id ${id} not found in database`);
    }
    const updatedActivity = {};
    if (title) updatedActivity.title = title;
    if (subtitle) updatedActivity.subtitle = subtitle;
    if (pending !== undefined) updatedActivity.pending = pending;

    await this.activityRepository.update(id, updatedActivity);
    return { statusCode: 200, message: 'Activity updated successfully' };
  }

  /**
   * Deletes an activity by ID.
   * @param {number} id - The ID of the activity to delete
   * @returns {Promise<{statusCode: number, message: string}>} - The result of the delete operation
   * @throws {Error} - If the activity is not found
   */
  async deleteActivity(id) {
    const activity = await this.searchActivityById(id);
    if (!activity) {
      throw new Error(`Activity with id ${id} not found in database`);
    }
    await this.activityRepository.remove(activity);
    return { statusCode: 200, message: 'Activity deleted successfully' };
  }
}

module.exports = ActivityService;
