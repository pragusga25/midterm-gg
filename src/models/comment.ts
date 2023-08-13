import mongoose from 'mongoose';
import { VideoDoc } from './video';
import { UserDoc } from './user';

interface CommentAttrs {
  comment: string;
  video: VideoDoc;
  user: UserDoc;
}

export interface CommentDoc extends mongoose.Document<string> {
  comment: string;
  video: VideoDoc;
  timestamp: Date;
  user: UserDoc;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
  findByVideoId(videoId: string): Promise<CommentDoc[] | null>;
}

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: new Date(),
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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

commentSchema.set('versionKey', 'version');
commentSchema.statics.build = (attrs: CommentAttrs) => new Comment(attrs);
// Retrieve user's comments for a video
commentSchema.statics.findByVideoId = (videoId: string) =>
  Comment.find({ video: videoId })
    .select('-video -version')
    .populate('user', 'username image isOnline')
    .sort('timestamp');

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
