'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(require('../route/profile.js'));


app.all('/api/*', (req, res, next) => res.sendStatus(404));

app.all('/*', (req, res, next) => res.sendStatus(404));

app.use(require('./error-middleware.js'));

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server.http = app.listen(process.env.PORT, () =>{
        console.log('Server is now started on port: ', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('Server is already started'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        console.log('Server is now offline');
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('The server is already stopped'));
  });
};
