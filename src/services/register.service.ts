import { User } from '../models';
import bcrypt from 'bcrypt';
import { MongoError } from 'mongodb';
import { UsernameTakenError } from '../errors';
import { JwtUtil } from '../shared/utils';

type Data = {
  username: string;
  password: string;
};

export const registerService = async (data: Data) => {
  const { username, password } = data;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = User.build({
      username,
      password: hashedPassword,
      image: 'https://i.imgur.com/3Lm0z3o.png',
    });
    await user.save();

    const tokens = JwtUtil.generateTokens({
      id: user.id,
      username: user.username,
    });

    return {
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (err) {
    if (err instanceof MongoError && err.code === 11000) {
      throw new UsernameTakenError();
    }

    throw err;
  }
};
