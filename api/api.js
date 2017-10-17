require('dotenv').config({path: '.env'});
const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('x-powered-by', false);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator({
  customSanitizers: {
    toNumeric: value => value.replace(/\D/g, ''),
    toLowerCase: value => value.toLowerCase(),
  },
}));

/*
 * Required if express is behind a proxy, e.g. Heroku, nginx
 * https://github.com/expressjs/session/blob/master/README.md
 */
app.set('trust proxy', process.env.TRUST_PROXY === 1 ? 1 : 0);

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

app.use((req, res, next) => {
  next();
});

// routes
const routes = require('./routes');
app.use('/api', routes);

app.use((req, res, next) => {
  console.log('no api match');
  next();
});

app.use(express.static(path.join(__dirname, '../build'), {index: ['index.html'], redirect: false}));

// Catch all route, return 404 if none of the above routes matched
// app.all('*', (req, res) => res.sendStatus(404).end('NOT FOUND'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(err);
});

const port = process.env.APIPORT ? process.env.APIPORT : 3000;
const host = process.env.HOST ? process.env.HOST : 'localhost';

const runnable = app.listen(port, err => {
  if (err) {
    console.error('HTTP Startup Error', err);
  }

  console.log('\t==> 👌 Listening on https://%s:%s/', host, port);
});

process.on('unhandledRejection',
  reason => console.error('UnhandledRejection', reason, new Error('UnhandledRejection').stack));

module.exports = app;
