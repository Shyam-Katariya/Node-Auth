const fs = require("node:fs")
const path = require('path');
const winston = require('winston');

// Define custom colors for log levels
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
};

winston.addColors(colors);

// Define a custom format to handle errors properly
const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

// Ensure that the 'logs' directory exists
const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Function to create a custom logger with dynamic filenames

const createLog = (logName, logDirectory = '') => {
    const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '_');
    const logFilename = `${logName}_${currentDate}.log`;
    
    const directoryPath = path.resolve(process.cwd(), 'logs', logDirectory);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            enumerateErrorFormat(),
            winston.format.colorize(colors),
            winston.format.splat(),
            winston.format.printf(({ level, message }) => {
                const timestamp = new Date().toISOString();
                return `[${timestamp}] ${level}: ${message}`;
            })
        ),
        // 
        transports: [
            new winston.transports.Console({
                stderrLevels: ['info', 'error', 'log', 'debug'],
            }),
            new winston.transports.File({
                filename: path.join(directoryPath, logFilename),
                level: 'error',
            }),
            new winston.transports.File({
                filename: path.join(directoryPath, logFilename),
                level: 'info',
            }),
        ],
    });
};

module.exports = {
    createLog
}
