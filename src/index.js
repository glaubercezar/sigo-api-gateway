'use strict';

require("dotenv-safe").config();
const express     = require('express');
const helmet      = require('helmet');
const proxy       = require('express-http-proxy');
const validation  = require('./validation');
const login       = require('./login');

const app = express();
app.use(helmet());
app.use(express.json());

//Cross-origin permissions
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, UPDATE, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const PORT = process.env.PORT || 8080;
const gestaoServiceProxy = proxy("http://localhost:8081");
const normasServiceProxy = proxy("http://localhost:8082");

app.get('/', (req, res) => {
  res.status(200).send('Hello SIGO API Gateway').end();
});

app.post('/api/v1/login', login);

app.post('/api/v1/gestao/status-report', validation, (req, res, next) => gestaoServiceProxy(req, res, next));
app.get('/api/v1/gestao/dashboard', validation, (req, res, next) => gestaoServiceProxy(req, res, next));

app.get('/api/v1/norms', validation, (req, res, next) => normasServiceProxy(req, res, next));
app.post('/api/v1/norms', validation, (req, res, next) => normasServiceProxy(req, res, next));
app.get('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));
app.put('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));
app.delete('/api/v1/norms/:id', validation, (req, res, next) => normasServiceProxy(req, res, next));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;