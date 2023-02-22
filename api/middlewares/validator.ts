import joi from "joi";
import { Request, Response, NextFunction } from "express";

const signUpSchema = joi.object().keys({
    name: joi.string().regex(/^[a-z A-Z]+$/).min(2).required()
        .error(() => "Invalid Name!"),
    email: joi.string().email().required()
        .error(() => "Invalid Email!"),
    password: joi.string().min(6).required()
        .error(() => "Invalid Password!"),
    re_password: joi.string().valid(joi.ref("password")).required().strict()
        .error(() => "Passwords Do Not Match!"),
});

const signInSchema = joi.object().keys({
    email: joi.string().email().required()
		.error(() => "Invalid Email!"),
    password: joi.string().min(6)
		.error(() => "Invalid Password!")
});

const createVehicleSchema = joi.object().keys({
	make: joi.string().min(2).required().error(() => "Invalid Make!"),
	model: joi.string().required().error(() => "Invalid Model!"),
	year: joi.string().min(4).required().error(() => "Invalid Year!"),
	color: joi.string().min(2).required().error(() => "Invalid Color!"),
	price: joi.number().required().error(() => "Invalid Price!"),
	registration: joi.string().required().error(() => "Invalid Registration!"),
	registration_date: joi.date().required().error(() => "Invalid Registration Date!"),
});

export const signUpValidator = async (req: Request, res: Response, next: NextFunction) => {

    const userFormData = req.body;

	try {
		await signUpSchema.validateAsync(userFormData);
	} catch (error) {
		return res.status(400).json(error);
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
		return res.status(400).json(error);
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
		return res.status(400).json(error);
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