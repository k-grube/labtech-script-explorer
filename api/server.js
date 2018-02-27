/**
 * Created by kgrube on 2/27/2018
 */
const path = require('path');
const server = require('pushstate-server');

console.log('Starting server out of', __dirname);

let port = process.env.PORT ? process.env.PORT : 3000;

if (process.env.NODE_ENV !== 'production') {
  port = 3030;
}

server.start({
  port,
  directory: path.join(__dirname, '../build'),
});
