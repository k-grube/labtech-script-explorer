const {decodeXML} = require('labtech-script-decode');
const {validationResult} = require('express-validator/check');

export function getScripts(req, res) {
  return [];
}

export function decodeScriptXML(req, res) {
  return new Promise((resolve, reject) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return reject(errors.array());
    }

    return resolve(decodeXML(req.body.scriptXML));
  });
}
