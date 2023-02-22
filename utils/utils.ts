require("dotenv").config();
import crypto from "crypto";

export const isDevelopment = () => process.env.NODE_ENV === "development";
export const isStaging = () => process.env.NODE_ENV === "staging";
export const isProduction = () => process.env.NODE_ENV === "production";

export const getRandomHexBytes = (byte: number) => {
	return crypto.randomBytes(byte).toString("hex");
}

export const isArrayAndHasContent = (arr: []) => {
	return Array.isArray(arr) && arr.length > 0;
}

export const getOffsetFromPage = (page: number, limit = 25) => {
	return (page - 1) * limit;
}

export const makeS3KeyForUser = (u_id: string, name: string) => {
	return `${name.split(".").join("").split(" ").join("-")}-${u_id}`;
}