const { Router } = require('express');
const { request } = require('../app');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');
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
    Order
    .get()
    .then(orders => res.json(orders))
    .catch(next);
    // try {
    //   const orders = await Order.get();
    //   res.json(orders);
    // } catch (err) {
    //   next(err);
    // }
  })
  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
