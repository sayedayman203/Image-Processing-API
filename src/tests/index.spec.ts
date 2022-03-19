import { join } from 'path';
import request from 'supertest';

import app from '../app';

describe('api tests', () => {
  let imgName = '';
  const testPath = [__dirname, '..', 'assets', 'test'];
  const agent = request(app);
  // upload
  it('error validation', async () => {
    const res = await agent.post('/api');

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('fail');
  });

  it('upload text should fail', async () => {
    const res = await agent
      .post('/api/')
      .attach('img', join(...testPath, 'a.txt'));
    expect(res.status).toBe(400);
    expect(res.body.status).toBe('fail');
  });

  it('upload img should work', async () => {
    const res = await agent
      .post('/api/')
      .attach('img', join(...testPath, '1.jpeg'));

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(typeof res.body.data.filename).toEqual('string');
    imgName = res.body.data.filename;
  });

  // get
  it('get uploaded img should work', async () => {
    const res = await agent.get(`/api/${imgName}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
  });

  it('get resized uploaded img should work', async () => {
    const res = await agent.get(`/api/${imgName}?width=400&&height=650`);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
  });

  it('get resized uploaded img wrong size should fail', async () => {
    const res = await agent.get(`/api/${imgName}?width=asd&&height=-9`);

    expect(res.status).toBe(400);
    expect(res.body.status).toEqual('fail');
  });

  // get random
  it('get random thumbnails should success', async () => {
    const res = await agent.get(`/api/`);

    expect(res.status).toBe(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
