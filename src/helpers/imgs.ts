import { join } from 'path';
import { promises as fs, constants as fsConsts } from 'fs';
import sharp from 'sharp';
import createError from 'http-errors';

type imageTypes = 'full' | 'thumbnail' | 'custom';
const imgsPath = [__dirname, '..', '..', 'public', 'imgs'];

export const saveResizeImg = (
  file: string | Buffer,
  {
    filename,
    type = 'custom',
    width,
    height,
    quality = 100,
    path = false,
  }: {
    filename: string;
    type?: imageTypes;
    width?: number;
    height?: number;
    quality?: number;
    path?: boolean; // used in testing
  }
): Promise<{ filename: string; fullPath: string }> => {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string' && !path) {
      file = join(...imgsPath, 'full', file);
    }

    const img = sharp(file);

    if (width && height) {
      width = +width;
      height = +height;
      img.resize({
        width,
        height,
        fit: 'inside',
      });

      const customName = filename.split('.');
      customName.splice(-1, 0, `${width}X${height}`);
      filename = customName.join('.');
    } else if (type === 'thumbnail') {
      img.resize({
        width: 100,
        height: 100,
        fit: 'inside',
      });
    }

    const fullPath = join(...imgsPath, type, filename);
    img
      .toFormat('jpeg')
      .jpeg({ quality })
      .toFile(fullPath)
      .then(() => {
        resolve({ filename, fullPath });
      })
      .catch((e) => {
        if (e.message === 'Input file is missing') {
          return reject(createError(404));
        }
        reject(e);
      });
  });
};

export const randomN = (n = 20): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(join(...imgsPath, 'thumbnail'))
      .then((files) => {
        if (files.length > n) {
          resolve(files.sort(() => Math.random() - Math.random()).slice(0, +n));
        } else {
          resolve(files);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getImg = (
  imgName: string,
  {
    width,
    height,
  }: {
    width?: number;
    height?: number;
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    //   get custom if exist
    if (width && height) {
      const customName = imgName.split('.');
      customName.splice(-1, 0, `${width}X${height}`);

      imgName = customName.join('.');
      const fullPath = join(...imgsPath, 'custom', imgName);
      fs.access(fullPath, fsConsts.F_OK)
        .then(() => {
          return resolve(fullPath);
        })
        .catch(() => {
          return reject('CUSTOM');
        });
    } else {
      const fullPath = join(...imgsPath, 'full', imgName);
      fs.access(fullPath, fsConsts.F_OK)
        .then(() => {
          return resolve(fullPath);
        })
        .catch(() => {
          return reject('FULL');
        });
    }
  });
};
