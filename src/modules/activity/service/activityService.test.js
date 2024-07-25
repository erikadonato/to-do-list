const ActivityService = require('./activityService');

describe('ActivityService', () => {
  let activityService;

  beforeAll(async () => {
    activityService = new ActivityService();
    await activityService.init();
  });

  beforeEach(async () => {
    await activityService.activityRepository.clear();
  });

  test('should add a new activity', async () => {
    const result = await activityService.saveActivity({ title: 'Test', subtitle: 'Test subtitle', pending: true });
    expect(result).toEqual({ statusCode: 200, message: 'Successfully created activity', id: result.id });
    const activities = await activityService.activityRepository.find();
    expect(activities).toHaveLength(1);
    expect(activities[0].title).toBe('Test');
  });

  test('should search an activity by id', async () => {
    const { id } = await activityService.saveActivity({ title: 'Test', subtitle: 'Test subtitle', pending: true });
    const result = await activityService.searchActivityById(id);
    expect(result.statusCode).toBe(200);
    expect(result.data.title).toBe('Test');
  });

  test('should throw error if activity not found', async () => {
    await expect(activityService.searchActivityById(999)).rejects.toThrow('Activity with id 999 not found');
  });

  test('should update an activity', async () => {
    const { id } = await activityService.saveActivity({ title: 'Test', subtitle: 'Test subtitle', pending: true });
    const result = await activityService.updateActivity({ id, title: 'Updated', subtitle: 'Updated subtitle', pending: false });
    expect(result.statusCode).toBe(200);
    const updatedActivity = await activityService.activityRepository.findOne(id);
    expect(updatedActivity.title).toBe('Updated');
  });

  test('should delete an activity', async () => {
    const { id } = await activityService.saveActivity({ title: 'Test', subtitle: 'Test subtitle', pending: true });
    const result = await activityService.deleteActivity(id);
    expect(result.statusCode).toBe(200);
    const activities = await activityService.activityRepository.find();
    expect(activities).toHaveLength(0);
  });

  test('should throw error if trying to update non-existing activity', async () => {
    await expect(activityService.updateActivity({ id: 999, title: 'Updated', subtitle: 'Updated subtitle', pending: false })).rejects.toThrow('Activity with id 999 not found in database');
  });

  test('should throw error if trying to delete non-existing activity', async () => {
    await expect(activityService.deleteActivity(999)).rejects.toThrow('Activity with id 999 not found');
  });
});
