import { createLogger, format, transports } from "winston"

const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

export type Logger = {
  log: (level: string, message: string) => void
}

export const createWinstonLogger = (): Logger => {
  const logger = createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      timestamp(),
      logFormat
    ),
    transports: [new transports.Console()]
  })

  const log = (level: string, message: string): void => {
    logger.log({ level, message })
  }

  return { log }
}

//##############################
// export const devLogger = () => {
//   return createLogger({
//     level: "debug",
//     format: combine(
//       format.colorize(),
//       timestamp(),
//       logFormat
//     ),
//     transports: [new transports.Console()]
//   })
// }

// export default devLogger