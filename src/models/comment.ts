import mongoose from 'mongoose';
import { VideoDoc } from './video';

interface CommentAttrs {
  username: string;
  comment: string;
  video: VideoDoc;
}

export interface CommentDoc extends mongoose.Document<string> {
  username: string;
  comment: string;
  video: VideoDoc;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
  findByVideoId(videoId: string): Promise<CommentDoc[] | null>;
}

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
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
// Remove the version and video fields from the response
commentSchema.statics.findByVideoId = (videoId: string) =>
  Comment.find({ video: videoId }).select('-video -version');

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
