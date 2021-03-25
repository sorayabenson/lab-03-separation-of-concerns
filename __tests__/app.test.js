const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('lab-03-separation-of-concern routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let order;
  beforeEach(async() => {
    order = await Order.insert({ quantity: 5 })
  })

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        //expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10,
        });
      });
  });

  it('gets all the orders in our database', () => {    
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body[0]).toEqual({
          id: '1',
          quantity: 5,
        });
      });
  });

  it('gets an order by id in our database', () => {    
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body[0]).toEqual({
          id: '1',
          quantity: 5,
        });
      });
  });

  it('put updates an order in our database and sends a text message', () => {
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 15 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 15,
        });
      });
  });

  it('deletes an order by id from our database', () => {    
    return request(app)
      .delete('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 5,
        });
      });
  });

});
