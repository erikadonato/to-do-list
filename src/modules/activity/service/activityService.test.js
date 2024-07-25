const { Repository } = require('typeorm');
const ActivityService = require('./activityService');
const Activity = require('../entity/activityEntity');

jest.mock('typeorm', () => ({
  getRepository: jest.fn(),
  EntitySchema: jest.fn(),
}));

describe('ActivityService', () => {
  let activityService;
  let activityRepository;
  const mockActivity = { id: 1, title: 'Test title', subtitle: 'Test subtitle', pending: true };

  beforeEach(() => {
    activityRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    require('typeorm').getRepository.mockReturnValue(activityRepository);
    activityService = new ActivityService({ getRepository: () => activityRepository });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchActivityById', () => {
    it('should return activity if found', async () => {
      
      activityRepository.findOne.mockResolvedValue(mockActivity);

      const result = await activityService.searchActivityById(1);

      expect(result).toEqual({
        statusCode: 200,
        message: 'Success in the search for the activity',
        data: mockActivity,
      });
      expect(activityRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw error if activity not found', async () => {
      activityRepository.findOne.mockResolvedValue(null);

      await expect(activityService.searchActivityById(1)).rejects.toThrow('Activity with id 1 not found');
      expect(activityRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('saveActivity', () => {
    it('should save a new activity and return success message', async () => {
      activityRepository.create.mockReturnValue(mockActivity);
      activityRepository.save.mockResolvedValue(mockActivity);

      const result = await activityService.saveActivity({ title: 'Test title', subtitle: 'Test subtitle', pending: true });

      expect(result).toEqual({ statusCode: 200, message: 'Successfully created activity', id: 1 });
      expect(activityRepository.create).toHaveBeenCalledWith({ title: 'Test title', subtitle: 'Test subtitle', pending: true });
      expect(activityRepository.save).toHaveBeenCalledWith(mockActivity);
    });
  });

  describe('updateActivity', () => {
    it('should update an existing activity and return success message', async () => {
      activityRepository.findOne.mockResolvedValue(mockActivity);

      const result = await activityService.updateActivity({ id: 1, title: 'Updated Title', subtitle: 'Updated Subtitle', pending: false });

      expect(result).toEqual({ statusCode: 200, message: 'Activity updated successfully' });
      expect(activityRepository.update).toHaveBeenCalledWith(1, { title: 'Updated Title', subtitle: 'Updated Subtitle', pending: false });
    });

    it('should throw error if activity not found', async () => {
       activityRepository.findOne.mockResolvedValue(null);

      await expect(activityService.updateActivity({ id: 1, title: 'Updated Title', subtitle: 'Updated Subtitle', pending: false })).rejects.toThrow('Activity with id 1 not found');
      expect(activityRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteActivity', () => {
    it('should delete an existing activity and return success message', async () => {
      activityRepository.findOne.mockResolvedValue(mockActivity);

      const result = await activityService.deleteActivity(1);

      expect(result).toEqual({ statusCode: 200, message: 'Activity deleted successfully' });
    });

    it('should throw error if activity not found', async () => {
      activityRepository.findOne.mockResolvedValue(null);

      await expect(activityService.deleteActivity(1)).rejects.toThrow('Activity with id 1 not found');
      expect(activityRepository.findOne).toHaveBeenCalledWith(1);
    });
  });
});
