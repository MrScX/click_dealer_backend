import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { logger } from "../loaders/logger";

import { redisConf } from "./redis-conf";

const redis = new Redis(redisConf);

redis.on("error", (err) => {
	logger.error(err);
	logger.error("Redis Connection Failed!");
});

redis.on("connect", () => {
    logger.info("Connected to the Redis Server");
});

redis.on("ready", () => {
    logger.info("Redis Instance is Ready!");
});

export const createRateLimiter = (keyPrefix: string, points: number, duration: number) => {

	const rateLimiter = new RateLimiterRedis({
		storeClient: redis,
		keyPrefix,
		points,
		duration,
	});

	return rateLimiter;
}