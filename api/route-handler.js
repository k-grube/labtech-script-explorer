/**
 * Created by Kevin on 10/14/2017.
 */
const PrettyError = require('pretty-error');
const _ = require('lodash');
const logger = require('./utils/logger').instance;
const pretty = new PrettyError();
const APIError = require('./utils/APIError');

/**
 * All route functions must return a {Promise}
 *  If resolved, a function may be returned
 *  If rejected, a redirect may be specified
 * @param {function} command
 * @returns {function(req, res, next)}
 */
module.exports = command => {
  return (req, res, next) => {
    let promise;
    try {
      promise = command(req, res, next);
    } catch (err) {
      promise = Promise.reject(err);
    }

    Promise.resolve(promise)
      .then(result => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      })
      .catch(reason => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          let error = reason;

          if (_.isArray(reason) && reason.length > 0) {
            [error] = reason;
          }

          if (typeof error === 'string') {
            error = new APIError({msg: error});
          } else if (error.message) {
            error = new APIError({msg: error.message});
          } else if (error.msg) {
            error = new APIError({msg: error.msg});
          } else {
            error = new APIError({msg: 'An error has occurred.'});
          }

          if (reason.errors && !_.isArray(reason.errors)) {
            error.errors = [error.errors];
          } else if (reason.errors && _.isArray(reason.errors)) {
            error.errors = reason.errors;
          } else if (_.isArray(reason)) {
            error.errors = reason;
          } else {
            error.errors = [];
          }

          logger.error('API Error: ', pretty.render(error));

          res.status(error.status || 500).json(error);
        }
      });
  };
};
