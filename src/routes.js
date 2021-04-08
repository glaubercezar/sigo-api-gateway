'use strict';

const express     = require('express');
const proxy       = require('express-http-proxy');
const validation  = require('./validation');
const login       = require('./login');
const router      = express.Router();
const isLocal     = process.env.NODE_ENV === 'development';

const gestaoServiceProxy = isLocal
  ? proxy("http://localhost:8081")
  : proxy("https://gestao-dot-sigo-308502.rj.r.appspot.com");

const normasServiceProxy = isLocal
  ? proxy("http://localhost:8082")
  : proxy("https://normas-dot-sigo-308502.rj.r.appspot.com");

/**
 * Mapeia requisições
*/

router.get('/', (req, res) => {
  res.status(200).send('Hello SIGO API Gateway').end();
});

router.post('/api/v1/login', express.json(), login);

router.get('/api/v1/gestao/dashboard', validation, (req, res, next) => gestaoServiceProxy(req, res, next));
router.post('/api/v1/gestao/status-report', validation, (req, res, next) => gestaoServiceProxy(req, res, next));

router.get('/api/v1/norms', validation, (req, res, next) => normasServiceProxy(req, res, next));
router.post('/api/v1/norms', validation, (req, res, next) => normasServiceProxy(req, res, next));
router.get('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));
router.put('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));
router.delete('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));

module.exports = router;