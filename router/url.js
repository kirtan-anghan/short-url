const express = require('express');
const router = express.Router();
// const view = require('../views/index.html');

const { getActualUrl , handleRedirect , handleAnalysis , handleAlluser} = require('../controller/controller');

router.route('/create').post(getActualUrl);


router.route('/:short_url').get(handleRedirect);

router.route('/').get(handleAlluser);
  
module.exports = router;