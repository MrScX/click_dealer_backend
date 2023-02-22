import { Router, IRouter } from "express";

import { createRateLimiter } from "../../utils/rate-limiter";
import { rateLimitMiddleware } from "../middlewares/rate-limiter";

import { postAuthenticate, postSignIn, postSignUp } from "../controllers/auth";
import { signUpValidator, signInValidator, sanitizeForm } from "../middlewares/validator";

const router = Router();

export const authRoutes = (app: IRouter) => {

	router.post(
		"/authenticate", 
		rateLimitMiddleware(createRateLimiter("authenticate-limit", 500, 1200)), // 500 req over 20 minutes
		postAuthenticate
	);

    router.post(
		"/register", 
		rateLimitMiddleware(createRateLimiter("registration-limit", 50, 1200)), 
		sanitizeForm,
		signUpValidator,
		postSignUp
	);

    router.post(
		"/login", 
		rateLimitMiddleware(createRateLimiter("login-limit", 30, 1200)), 
		sanitizeForm, 
		signInValidator,
		postSignIn
	);

    app.use("/auth", router);
}