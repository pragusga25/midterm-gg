import { Product } from '../models';

export const listProductsService = async (videoId: string) => {
  const products = await Product.findByVideoId(videoId);

  return { data: products };
};
