import { Video } from '../models';

export const listVideosService = async () => {
  const videos = await Video.find().select(
    '-embededYoutubeUrl -products -comments -version'
  );

  return { data: videos };
};
