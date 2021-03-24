const { Router } = require('express');
const { request } = require('../app');
const OrderService = require('../services/OrderService');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const orders = await pool.query(`
      SELECT * FROM orders`);

      res.json(orders.rows[0]);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
