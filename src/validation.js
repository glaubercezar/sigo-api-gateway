'use strict';

const jwt = require('jsonwebtoken');

/*
 * Validação das requisições
 */

module.exports = (req, res, next) => {

  const secret = process.env.JWT_SECRET;
  const apiKey = process.env.API_KEY;
  const authHeader = req.headers.authorization;

  if(authHeader) {
    const authType    = authHeader.split(" ");
    const type = authType[0];
    const value = authType[1];

    // verifica o JWT
    if(type === 'Bearer' && value && value != "null")
    {
      return jwt.verify(value, secret, function(err, decoded) {
        if (err) return res.status(401).send({
          auth: false, message: err.message.message
        });
        next();
      });
    }

    // verifica a API Key
    if(type === 'ApiKey' && value && value === apiKey) {
      next();
      return;
    }
  }

  res.status(401).send({
    auth: false, message: 'No token provided.'
  });
};