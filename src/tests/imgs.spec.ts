import { join } from 'path';
import { promises as fs, constants } from 'fs';
import { saveResizeImg } from '../helpers/imgs';
describe('img resize helper tests', () => {
  let imgName = 'testing.jpeg';
  const imgsPath = [__dirname, '..', '..', 'public', 'imgs'];
  const testPath = [__dirname, '..', '..', 'public', 'test'];

  afterAll(async () => {
    fs.rm(join(...imgsPath, 'full', imgName), {});
    fs.rm(join(...imgsPath, 'thumbnail', imgName), {});
    const customName = imgName.split('.');
    customName.splice(-1, 0, `700X480`);
    imgName = customName.join('.');
    fs.rm(join(...imgsPath, 'custom', imgName), {});
  });

  // upload
  it('check save full img', async () => {
    const { fullPath } = await saveResizeImg(join(...testPath, '1.jpeg'), {
      filename: imgName,
      type: 'full',
      path: true,
    });
    expect(async () => {
      await fs.access(fullPath, constants.R_OK);
    }).not.toThrow();
  });

  it('check save thumbnail img', async () => {
    const { fullPath } = await saveResizeImg(join(...testPath, '1.jpeg'), {
      filename: imgName,
      type: 'thumbnail',
      path: true,
    });
    expect(async () => {
      await fs.access(fullPath, constants.R_OK);
    }).not.toThrow();
  });

  it('check save custom img', async () => {
    const { fullPath } = await saveResizeImg(join(...testPath, '1.jpeg'), {
      filename: imgName,
      type: 'custom',
      width: 700,
      height: 480,
      path: true,
    });
    expect(async () => {
      await fs.access(fullPath, constants.R_OK);
    }).not.toThrow();
  });
});
