import { Storage } from '@google-cloud/storage';
import { config } from '../shared/config';
import { format } from 'util';
import path from 'path';
import { logger } from '../shared/libs';

const storage = new Storage({
  projectId: config.gcp.projectId,
  credentials: {
    private_key: config.gcp.privateKey,
    client_email: config.gcp.clientEmail,
  },
});

const bucket = storage.bucket(config.gcp.bucketName);

const getFilePublicUrl = (key: string) =>
  format(`https://storage.googleapis.com/${bucket.name}/${key}`);

const uploadFile = (file: Express.Multer.File, userId: string) =>
  new Promise<string>(async (resolve, reject) => {
    const { originalname, buffer } = file;
    const ext = path.extname(originalname).toLowerCase();

    const key = `${userId}${ext}`;

    const blob = bucket.file(key);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    logger.info('Uploading file');

    blobStream
      .on('finish', async () => {
        resolve(getFilePublicUrl(key));
      })
      .on('error', async (err: unknown) => {
        reject(`Unable to upload file, something went wrong`);
      })
      .end(buffer, async () => {
        logger.info({
          message: 'File uploaded',
          key,
          originalname,
        });
      });
  });

export { storage, bucket, uploadFile, getFilePublicUrl };
