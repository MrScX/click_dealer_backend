import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "./logger";

import { dbConfig } from "../utils/db-conf";
import { MONGO_CONN_URL } from "../utils/const";

export const loadDatabase = () => {

	mongoose.set("strictQuery", false);
	mongoose.connect(MONGO_CONN_URL, dbConfig.development as ConnectOptions);

	const db = mongoose.connection;
	db.on("error", (error) => logger.error(error));
	db.once("open", () => logger.info("Database Connection Established!"));

	return db;
}