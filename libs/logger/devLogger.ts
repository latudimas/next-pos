import { createLogger, format, transports } from "winston"

const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      timestamp(),
      logFormat
    ),
    transports: [new transports.Console()]
  })
}

export default devLogger