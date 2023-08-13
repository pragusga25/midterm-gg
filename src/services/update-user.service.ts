import { UserNotFoundError } from '../errors';
import { uploadFile } from '../gcp';
import { User } from '../models';

type Data = {
  bio?: string;
  image?: Express.Multer.File;
  id: string;
  removeImage: boolean;
  isOnline?: boolean;
};

export const updateUserService = async (data: Data) => {
  const { id, removeImage, image, bio, isOnline } = data;
  const user = await User.findById(id);
  let isModified = false;

  if (!user) throw new UserNotFoundError();

  if (removeImage) {
    isModified = true;
    user.image = undefined;
  } else if (image) {
    const publicUrl = await uploadFile(image, id);
    user.image = publicUrl;
    isModified = true;
  }

  if (bio) {
    isModified = true;
    user.bio = bio;
  }

  if (isOnline !== undefined) {
    isModified = true;
    user.isOnline = isOnline;
  }

  if (isModified) await user.save();
};
