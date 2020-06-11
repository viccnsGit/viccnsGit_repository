var winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');
var fs = require('fs');

var logDir = 'logs';
if ( !fs.existsSync( logDir ) ) {
  fs.mkdirSync( logDir );
}

var logger = winston.createLogger({
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
    level: 'debug', // 최소 레벨
    // 파일저장
    transports: [
        new winston.transports.DailyRotateFile({
            filename : 'logs/system.log', // log 폴더에 system.log 이름으로 저장
            zippedArchive: true, // 압축여부
            format: winston.format.printf(
                info => `${new Date().add({hours:9}).toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.printf(
                info => `${new Date().add({hours:9}).toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
        })
    ]
});

module.exports = logger;
