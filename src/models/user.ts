import mongoose from 'mongoose';

interface UserAttrs {
  username: string;
  password: string;
  image?: string;
  bio?: string;
}

export interface UserDoc extends mongoose.Document<string> {
  username: string;
  password: string;
  image?: string;
  bio?: string;
  version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByUsername(username: string): Promise<UserDoc | null>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.set('versionKey', 'version');
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);
userSchema.statics.findByUsername = (username: string) =>
  User.findOne({ username }).select('-version -comments -products');

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
