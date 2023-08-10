// import mongoose from 'mongoose';
// import { config } from './shared/config';
// import { Video } from './models';

// const ColorThief = require('colorthief');

// const rgbToHex = (r: number, g: number, b: number) =>
//   '#' +
//   [r, g, b]
//     .map((x) => {
//       const hex = x.toString(16);
//       return hex.length === 1 ? '0' + hex : hex;
//     })
//     .join('');

// const addThumbnailColor = async () => {
//   await mongoose.connect(config.mongoUri);

//   const videos = await Video.find({});

//   for (let i = 0; i < videos.length; i++) {
//     console.log('i: ', i);
//     const video = videos[i];
//     const color = await ColorThief.getColor(video.thumbnailUrl);
//     const hex = rgbToHex(color[0], color[1], color[2]);
//     video.thumbnailColor = hex;
//     await video.save();
//   }

//   await mongoose.disconnect();
// };

// addThumbnailColor();
