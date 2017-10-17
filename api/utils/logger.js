/**
 * Created by kgrube on 6/13/2017.
 *
 * REQUIRE LOGGER.INSTANCE
 */
const winston = require('winston');
const papertrail = require('winston-papertrail').Papertrail;

const LOGGER_KEY = Symbol.for('connectwise-asset-sync.utils.logger');

const globalSymbols = Object.getOwnPropertySymbols(global);
const hasLoggerKey = (globalSymbols.indexOf(LOGGER_KEY) > -1);

if (!hasLoggerKey) {
  const winstonTransports = [
    new (winston.transports.Console)({
      level: 'verbose',
      colorize: true,
      handleExceptions: true,
    }),
    new (winston.transports.File)({
      filename: './app.log',
      level: 'debug',
      handleExceptions: true,
      maxsize: 20485760, // 20 MB
      maxFiles: 10,
      colorize: false,
    }),
  ];

  let winstonPapertrail;

  if (process.env.PAPERTRAIL_HOST) {
    winstonPapertrail = new winston.transports.Papertrail({
      host: process.env.PAPERTRAIL_HOST,
      port: process.env.PAPERTRAIL_PORT,
      level: 'verbose',
      logFormat: (level, message) => `${level}: ${message}`,
    });
    winstonTransports.push(winstonPapertrail);
  }

  global[LOGGER_KEY] = new (winston.Logger)({
    transports: winstonTransports,
    exitOnError: false,
  });
}

const singleton = {};

Object.defineProperty(singleton, 'instance', {
  get: () => {
    return global[LOGGER_KEY];
  },
});

Object.freeze(singleton);

/**
 * @type {{instance}}
 */
module.exports = singleton;