'use strict';

require("dotenv-safe").config();
const express     = require('express');
const helmet      = require('helmet');
const cors        = require('cors');
const routes      = require('./routes');
const app         = express();
const PORT        = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(routes);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;