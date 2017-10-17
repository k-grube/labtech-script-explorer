const express = require('express');
const router = express.Router();
const routeHandler = require('./route-handler');

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

const scriptActions = require('./actions/scripts');

router.get('/test', [
  check('test', 'test cannot equal poop').not().contains('poop'),
], routeHandler((req, res, next) => {
  return new Promise((resolve, reject) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      reject(errors.array());
    }

    return resolve({msg: 'loaded'});
  });
}));

router.get('/scripts', routeHandler(scriptActions.getScripts));

router.post('/script/decode', [check('scriptXML').exists()], routeHandler(scriptActions.decodeScriptXML));

module.exports = router;
