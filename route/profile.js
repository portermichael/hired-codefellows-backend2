const {Router} = require('express');
const profileData = require('../db/convertedData.json');

const profileRouter = module.exports = new Router();

profileRouter.get('/api/profiles', (req, res, next) => {
  console.log('waterbottle')
  return res.json(profileData);
});
