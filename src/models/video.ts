import mongoose from 'mongoose';

interface VideoAttrs {
  title: string;
  description: string;
  thumbnailUrl: string;
  embededYoutubeUrl: string;
}

export interface VideoDoc extends mongoose.Document<string> {
  title: string;
  description: string;
  thumbnailUrl: string;
  embededYoutubeUrl: string;
  version: number;
}

interface VideoModel extends mongoose.Model<VideoDoc> {
  build(attrs: VideoAttrs): VideoDoc;
}

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    embededYoutubeUrl: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
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

videoSchema.set('versionKey', 'version');
videoSchema.statics.build = (attrs: VideoAttrs) => new Video(attrs);

const Video = mongoose.model<VideoDoc, VideoModel>('Video', videoSchema);

export { Video };
