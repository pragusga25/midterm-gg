import { UserNotFoundError } from '../errors';
import { User } from '../models';

export const getMyDataService = async (id: string) => {
  const user = await User.findById(id);

  if (!user) throw new UserNotFoundError();

  return {
    data: {
      id: user.id,
      username: user.username,
      image: user.image,
      bio: user.bio,
    },
  };
};
