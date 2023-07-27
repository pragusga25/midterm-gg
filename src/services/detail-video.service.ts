import { VideoNotFoundError } from '../errors';
import { Video } from '../models';

export const detailVideoService = async (id: string) => {
  const video = await Video.findById(id).populate({
    path: 'comments',
    populate: {
      path: 'products',
    },
  });

  if (!video) throw new VideoNotFoundError();

  return { data: video };
};
