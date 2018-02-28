import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
  constructor(req) {
    /* eslint-disable no-return-assign */
    methods.forEach((method) =>
      this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
        console.log('ApiClient path:', path);

        console.log('is development: ', __DEVELOPMENT__);

        if (__DEVELOPMENT__) {
          path = `http://localhost:3030${path}`;
        }

        const request = superagent[method](path);

        if (params) {
          request.query(params);
        }

        // // if (__SERVER__ && req.get('cookie')) {
        // if (req.get('cookie')) {
        //   request.set('cookie', req.get('cookie'));
        // }

        if (data) {
          request.send(data);
        }

        request.end((err, {body} = {}) => {
          return err ? reject({...body, status: err.status} || err) : resolve(body);
        });
      }));
  }
}
