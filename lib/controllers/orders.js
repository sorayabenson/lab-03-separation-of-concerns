const { Router } = require('express');
const { request } = require('../app');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', (req, res, next) => {
    OrderService
      .create(req.body)
      .then(order => res.send(order))
      .catch(next);
    // try {
    //   const order = await OrderService.create(req.body);
    //   res.send(order);
    // } catch (err) {
    //   next(err);
    // }
  })
  .get('/', (req, res, next) => {
    Order
    .getOrders()
    .then(orders => res.json(orders))
    .catch(next);
    // try {
    //   const orders = await Order.get();
    //   res.json(orders);
    // } catch (err) {
    //   next(err);
    // }
  })
  .get('/:id', async (req, res, next) => {
    // try {
    //   const order = await pool.query(
    //     `SELECT * FROM orders
    //     WHERE id=$1`,
    //     [req.params.id]
    //   );

    //   res.json(order.rows[0]);
    // } catch(err) {
    //   next(err);
    // }

    // try {
    //   const order = await Order.getById(req);
    //   res.json(order);
    // } catch(err) {
    //   next(err);
    // }

    Order
      .getById(req)
      .then(order => res.json(order))
      .catch(next);
    
  })
  .put('/:id', async (req, res, next) => {
    // try {
    //   const order = await pool.query(`
    //   UPDATE orders
    //   SET quantity = $1
    //   WHERE id=$2
    //   RETURNING *`,
    //   [
    //     req.body.quantity,
    //     req.params.id
    //   ]);

    //   res.json(order.rows[0]);
    // } catch(err) {
    //   next(err)
    // }

    try {
      const order = await OrderService.update(req.body, req);

      res.json(order);
    } catch(err) {
      next(err)
    }
  })
  .delete('/:id', async (req, res, next) => {});
