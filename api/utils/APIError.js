/**
 * Created by Kevin on 10/14/2017.
 */

export default class APIError extends Error {
  constructor({msg, errors = [], status = 500, code = undefined}) {
    super(msg);
    this.name = 'APIError';
    // noinspection JSUnresolvedVariable
    this.msg = msg;
    // noinspection JSUnresolvedVariable
    this.errors = errors;
    this.status = status;
    this.code = code;
  }
}
