import { PipelineStage } from 'mongoose';
import { Video } from '../models';

export const listVideosService = async (search?: string) => {
  const pipeline: PipelineStage[] = [];

  if (search) {
    pipeline.push({
      $search: {
        index: 'default',
        text: {
          query: search,
          path: {
            wildcard: '*',
          },
          fuzzy: {},
        },
      },
    });
  } else {
    pipeline.push({
      $sort: {
        title: 1,
      },
    });
  }

  const videos = await Video.aggregate([
    ...pipeline,
    {
      $project: {
        title: 1,
        description: 1,
        thumbnailUrl: 1,
        thumbnailColor: 1,
        id: {
          $toString: '$_id',
        },
        _id: 0,
      },
    },
  ]);

  return { data: videos };
};
