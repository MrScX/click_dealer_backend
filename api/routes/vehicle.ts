import { Router, IRouter } from "express";

import { isAuth } from "../middlewares/auth";
import { createRateLimiter } from "../../utils/rate-limiter";
import { rateLimitMiddleware } from "../middlewares/rate-limiter";

import { 
	postNewVehicle, 
	patchVehicle, 
	getAllVehicles, 
	deleteVehicle
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

    app.use("/vehicle", isAuth, router);
}