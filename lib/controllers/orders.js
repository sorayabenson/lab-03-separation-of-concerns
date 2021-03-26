const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', (req, res, next) => {
    OrderService
      .create(req.body)
      .then(order => res.send(order))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Order
    .getOrders()
    .then(orders => res.send(orders))
    .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Order
      .getById(req)
      .then(order => res.send(order))
      .catch(next);
    
  })

  .put('/:id', (req, res, next) => {
    OrderService
      .update(req.body, req)
      .then(order => res.send(order))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    OrderService
      .deleteOrder(req)
      .then(order => res.send(order))
      .catch(next);
  });
