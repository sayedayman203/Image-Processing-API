/* eslint-disable */
const fs = require('fs/promises');
const main = async () => {
  await fs.mkdir('./public/imgs/full', { recursive: true });
  await fs.mkdir('./public/imgs/custom', { recursive: true });
  await fs.mkdir('./public/imgs/thumbnail', { recursive: true });
  await fs.mkdir('./logs', { recursive: true });
};
main();
