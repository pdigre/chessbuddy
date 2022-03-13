'use strict';

const express = require('express');
const server = express();
const path = require('path');
const port = process.env.PORT;
const compression = require('compression');
const helmet = require('helmet');

const staticFiles = path.join(__dirname, 'build');
server.use(compression());
server.use(helmet());
server.use(express.static(staticFiles));
server.listen(port);
console.log(`Running ChessBuddy from ${staticFiles} on port ${port}`);
