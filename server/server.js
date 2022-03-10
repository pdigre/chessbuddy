'use strict';

const express = require('express');
const server = express();
const path = require('path');
const port = 80;

const staticFiles = path.join(__dirname, '../build');
server.use(express.static(staticFiles));
server.listen(port);
console.log(`Running ChessBuddy from ${staticFiles} on port ${port}`);
