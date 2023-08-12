import multer from 'multer';
import { InvalidFileError } from '../errors';

const multerMiddleware = (allowedMimeTypes: string[], maxFileSize: number) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: maxFileSize,
    },
    fileFilter: (_req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new InvalidFileError());
      }
    },
  });

export const multerImageMiddleware = multerMiddleware(
  ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'],
  5 * 1024 * 1024
).single('image');
