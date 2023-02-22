import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";

export const rateLimitMiddleware = (rateLimiter: RateLimiterRedis) => {

	return (req: Request, res: Response, next: NextFunction) => {
		rateLimiter.consume(req.ip)
			.then(() => {
				next();
			})
			.catch(() => {
				res.status(429).json({ msg: "Too Many Requests" });
			});
	}
}