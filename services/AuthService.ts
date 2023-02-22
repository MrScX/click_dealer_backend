import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { logger } from "../loaders/logger";

import { User } from "../models/User";

import { userStatus } from "../utils/const";
import { ISignIn, IUser } from "../utils/interfaces";

const BCRYPT_SALT = 12;

export const generateJWT = (payload: object, expiresIn: string) => {
	return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
}

export const decodeAuthToken = (token: string) => {
	try {

		const decode = jwt.verify(token, process.env.JWT_SECRET as string);
		return { tokenValid: true, data: decode };

	} catch (error) {
		logger.error(error);
		return { error, tokenValid: false };
	}
}

export const Authenticate = async (id: string | undefined) => {

	try {

		const user = await User.findById(id).exec();

		if (user) {

			if (user.status === userStatus.DISABLED) {
				return { status: 401, message: "Your account has been disbaled." };
			}

			return {
				status: 200,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					status: user.status
				}
			};
		}

		return { status: 404 };
		
	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const SignIn = async (body: ISignIn) => {

	try {

		const { email, password } = body;

		const invalidCreds = {
			status: 400,
			message: "Invalid credentials"
		};

		const user = await User.findOne({ email }).exec();

		if (!user) {
			return invalidCreds;
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return invalidCreds;
		}
		
		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
			status: user.status
		};

		user.last_login = new Date();
		await user.save();

		return {
			status: 200,
			data: payload
		};
		
	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const SignUp = async (body: IUser) => {

	try {

		const { name, email, password } = body;

		const existingUser = await User.findOne({ email }).exec();

		if (existingUser) {
			return { status: 400, message: "User with email already exists" };
		}

		const hash = await bcrypt.hash(password, BCRYPT_SALT);

		const user = new User({
			name,
			email,
			password: hash,
			status: userStatus.ACTIVE
		});

		await user.save();

		return { status: 200, user };
		
	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}