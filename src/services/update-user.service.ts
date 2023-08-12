import { UserNotFoundError } from '../errors';
import { uploadFile } from '../gcp';
import { User } from '../models';

type Data = {
  bio?: string;
  image?: Express.Multer.File;
  id: string;
  removeImage: boolean;
};

export const updateUserService = async (data: Data) => {
  const { id, removeImage, image, bio } = data;
  const user = await User.findById(id);

  const prevBio = user?.bio;
  const prevImage = user?.image;

  if (!user) throw new UserNotFoundError();

  if (removeImage) {
    user.image = undefined;
  } else if (image) {
    const publicUrl = await uploadFile(image, id);
    user.image = publicUrl;
  }

  if (bio) user.bio = bio;

  const isChanged = prevBio !== bio || prevImage !== user.image;

  if (isChanged) await user.save();
};
