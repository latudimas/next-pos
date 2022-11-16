import devLogger from './devLogger'

let logger = devLogger()

// TODO: switcher for choosing prod logger or dev logger
// switch(process.env.NODE_ENV) {
//   // case "production": {
//   //   logger = productionLogger()
//   //   break
//   // }
//   case "development": {
//     logger = devLogger()
//     break
//   }
//   default: {
//     logger = devLogger()
//     break
//   }
// }

export default logger