import { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { stream } from "./logger";
import { loadRoutes } from "../api";

import { validateAuth } from "../api/middlewares/auth";

export const expressLoader = async (app: Express) => {

	app.use(cors({
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