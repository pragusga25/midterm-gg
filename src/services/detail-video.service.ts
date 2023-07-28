import { VideoNotFoundError } from '../errors';
import { Video } from '../models';

export const detailVideoService = async (id: string) => {
  // Remove the version, comments, and products fields from the response
  const video = await Video.findById(id).select('-version -comments -products');

  if (!video) throw new VideoNotFoundError();

  return { data: video };
};
