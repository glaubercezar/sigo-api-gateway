'use strict';

const jwt = require('jsonwebtoken');

/*
 * Login
 */

module.exports = (req, res) => {

  const TOKEN_EXPIRES = 3600; //tempo em segundos 3600 = 1h
  const secret = process.env.JWT_SECRET;
  const body = req.body;

  if(body.username === "admin" && body.password === "admin") {
    const jwtResult = jwt.sign({}, secret, { expiresIn: TOKEN_EXPIRES });
    res.status(200).send({
      token: jwtResult
    });
    return;
  }

  res.status(400).send({
    auth: false, message: 'Usuário ou senha inválidos'
  });
};