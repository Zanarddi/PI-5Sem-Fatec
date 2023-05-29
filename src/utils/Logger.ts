const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const LOGS_FOLDER = `${__dirname}/../../logs`;

// USAGE:
// import { userLogger } from "./Logger";

// userLogger.emerg("Hello, world!");
// userLogger.alert("Hello, world!");
// userLogger.crit("Hello, world!");
// userLogger.error("Hello, world!");
// userLogger.warning("Hello, world!");
// userLogger.notice("Hello, world!");
// userLogger.info("Hello, world!");
// userLogger.debug("Hello, world!");

const myLevel = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  }
}

const myFormat = printf(({ level, message, label, timestamp }: any) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const userLogger = createLogger({
  levels: myLevel.levels,
  format: combine(
    label({ label: '' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    // uncomment this to also log to the console
    new transports.Console(),
    new transports.File({ filename: `${LOGS_FOLDER}/user.log` })
  ]
});