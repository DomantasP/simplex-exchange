const supertest = require('supertest');
const { server } = require('../api');
const request = supertest(server);

jest.setTimeout(30000);

describe('Rate Controller', () => {
  test('/quote endpoint should return success', async () => {
    await request.get(`/quote?base_currency=ILS&quote_currency=EUR&base_amount=100000`)
      .send()
      .expect(200)
  });

  test('/quote endpoint should fail with unsupported currency', async () => {
    await request.get(`/quote?base_currency=LTU&quote_currency=EUR&base_amount=100000`)
      .send()
      .expect(400)
  });
});

afterAll(async (done) => {
  await server.close();
  done()
});
