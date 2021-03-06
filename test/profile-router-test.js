'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const API_URL = process.env.API_URL;

describe('testing profile routes', () => {
  before(server.start);
  after(server.stop);
  describe('testing GET at /api/profiles', () => {
    it('should respond with a 200 status and some data', () => {
      return superagent.get(`${API_URL}/api/profiles`)
        .then((res) => {
          console.log('^^^^^^^^^^^^^', res.body, '*********');
          expect(res.status).toEqual(200);
        });
    });
  });
});
