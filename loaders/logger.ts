require("dotenv").config();

import appRoot from "app-root-path";
import { createLogger, format, transports } from "winston";
import 'winston-daily-rotate-file';

import { isDevelopment } from "../utils/utils";

export const logger = createLogger({
	level: "silly",
	format: format.combine(
		format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		new transports.DailyRotateFile({
			filename: appRoot + "/logs/errors.log",
			level: "error",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true
		}),
		new transports.DailyRotateFile({
			filename: appRoot + "/logs/combined.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true
		})
	]
});

if (isDevelopment()) {

	logger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple()
		)
	}));
}

export const stream = {
	write: (message: string) => logger.http(message)
};

