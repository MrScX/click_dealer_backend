import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../loaders/logger";

const signUpSchema = joi.object().keys({
	name: joi.string().regex(/^[a-z A-Z]+$/).min(2).required()
		.messages({
			"any.required": "Name is required",
			"string.base": "Invalid Name",
			"string.min": "Name must be at least 2 characters long",
			"string.pattern.base": "Name must contain only letters",
		}),
	email: joi.string().email().required()
		.messages({
			"any.required": "Email is required",
			"string.base": "Invalid Email",
		}),
	password: joi.string().min(6).required()
		.messages({
			"any.required": "Password is required",
			"string.base": "Invalid Password",
			"string.min": "Password must be at least 6 characters long",
		}),
	re_password: joi.string().valid(joi.ref("password")).required().strict()
		.messages({
			"any.required": "Password is required",
			"string.base": "Invalid Password",
			"string.min": "Password must be at least 6 characters long",
			"any.only": "Passwords do not match",
		}),
});

const signInSchema = joi.object().keys({
	email: joi.string().email().required()
		.messages({
			"any.required": "Email is required",
			"string.base": "Invalid Email",
		}),
	password: joi.string().min(6)
		.messages({
			"any.required": "Password is required",
			"string.base": "Invalid Password",
			"string.min": "Password must be at least 6 characters long",
		})
});

const createVehicleSchema = joi.object().keys({
	make: joi.string().min(2).required(),
	model: joi.string().required(),
	year: joi.string().min(4).required(),
	color: joi.string().min(2).required(),
	price: joi.number().required(),
	registration: joi.string().required(),
	registration_date: joi.date().required(),
});

export const signUpValidator = async (req: Request, res: Response, next: NextFunction) => {

	const userFormData = req.body;

	try {
		await signUpSchema.validateAsync(userFormData);
	} catch (error) {
		const joiError = error as joi.ValidationError;
		logger.error(joiError);
		return res.status(400).json({ message: joiError.details[0].message });
	}

	return next();
}

export const signInValidator = async (req: Request, res: Response, next: NextFunction) => {

	const userFormData = {
		email: req.body.email,
		password: req.body.password
	};

	try {
		await signInSchema.validateAsync(userFormData);
	} catch (error) {
		const joiError = error as joi.ValidationError;
		logger.error(joiError);
		return res.status(400).json({ message: joiError.details[0].message });
	}

	return next();
}

export const createVehicleValidator = async (req: Request, res: Response, next: NextFunction) => {

	const vehicleFormData = {
		make: req.body.make,
		model: req.body.model,
		year: req.body.year,
		color: req.body.color,
		price: req.body.price,
		registration: req.body.registration,
		registration_date: req.body.registration_date
	};

	try {
		await createVehicleSchema.validateAsync(vehicleFormData);
	} catch (error) {
		const joiError = error as joi.ValidationError;
		logger.error(joiError);
		return res.status(400).json({ message: joiError.details[0].message });
	}

	return next();
}

export const sanitizeForm = (req: Request, _: Response, next: NextFunction) => {

	// remove double spaces and trim unwanted spaces

	const body = req.body;

	for (let key in body) {

		if (typeof body[key] === "string") {
			body[key] = body[key].replace(/\s\s+/g, " "); // replace double spaces with single space
			body[key] = body[key].trim();
		}
	}

	return next();
}