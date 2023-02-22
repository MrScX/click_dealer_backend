import { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { stream } from "./logger";
import { loadRoutes } from "../api";

import { isDevelopment } from "../utils/utils";

import { validateAuth } from "../api/middlewares/auth";

export const expressLoader = async (app: Express) => {

	const whitelist = ["http://localhost:3000"];

	app.use(cors({
		origin: (origin, callback) => {
			if (isDevelopment() || whitelist.indexOf(origin as string) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		optionsSuccessStatus: 200,
		credentials: true
	}));

	app.use(helmet());
	app.use(morgan("combined", { stream }));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({ limit: "50mb" }));
	app.enable("trust proxy");

	app.use(validateAuth);
	app.use(process.env.API_PREFIX || "/v1", loadRoutes());
}