// // logger.service.ts

// import { Injectable } from '@nestjs/common';
// import * as winston from 'winston';

// @Injectable()
// export class LoggerService {
//   private readonly logger: winston.Logger;

//   constructor() {
//     this.logger = winston.createLogger({
//       level: 'info',
//       format: winston.format.simple(),
//       transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'logs/combined.log' }),
//       ],
//     });
//   }

//   log(message: string) {
//     this.logger.log('info', message);
//   }

//   error(message: string, trace: string) {
//     this.logger.error(message, trace);
//   }

//   warn(message: string) {
//     this.logger.warn(message);
//   }

//   debug(message: string) {
//     this.logger.debug(message);
//   }
// }





// logger.service.ts

import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as dailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new dailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
