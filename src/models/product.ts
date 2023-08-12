import mongoose from 'mongoose';
import { VideoDoc } from './video';

interface ProductAttrs {
  title: string;
  link: string;
  price: number;
  video: VideoDoc;
  image: string;
}

export interface ProductDoc extends mongoose.Document<string> {
  title: string;
  link: string;
  price: number;
  video: VideoDoc;
  image: string;
  version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
  findByVideoId(videoId: string): Promise<ProductDoc[] | null>;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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

productSchema.set('versionKey', 'version');
productSchema.statics.build = (attrs: ProductAttrs) => new Product(attrs);
// Remove the version and video fields from the response
productSchema.statics.findByVideoId = (videoId: string) =>
  Product.find({ video: videoId }).select('-video -version');

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
