import { Router, IRouter } from "express";

import { createRateLimiter } from "../../utils/rate-limiter";
import { rateLimitMiddleware } from "../middlewares/rate-limiter";

import { 
	postNewVehicle, 
	patchVehicle, 
	getAllVehicles, 
	deleteVehicle, 
	getVehicleById 
} from "../controllers/vehicle";

import { sanitizeForm, createVehicleValidator } from "../middlewares/validator";

const router = Router();

export const vehicleRoutes = (app: IRouter) => {

	router.post(
		"/new", 
		rateLimitMiddleware(createRateLimiter("authenticate-limit", 500, 1200)), // 500 req over 20 minutes
		sanitizeForm,
		createVehicleValidator,
		postNewVehicle
	);

    router.patch(
		"/:id", 
		rateLimitMiddleware(createRateLimiter("agent-registration-limit", 50, 1200)), 
		patchVehicle
	);

    router.delete(
		"/:id", 
		rateLimitMiddleware(createRateLimiter("army-login-limit", 30, 1200)), 
		deleteVehicle
	);

	router.get(
		"/all", 
		getAllVehicles
	);

	router.get(
		"/:id", 
		getVehicleById
	);

    app.use("/vehicle", router);
}