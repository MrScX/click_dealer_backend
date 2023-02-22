import { RedisOptions } from "ioredis";

export const redisConf: RedisOptions = {
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
	family: 4,
	password: process.env.REDIS_PASS,
	db: 0,
	enableOfflineQueue: false
};