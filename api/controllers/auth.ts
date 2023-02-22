import { Request, Response } from "express";
import { IExpressRequest, IUser } from "../../utils/interfaces";

import { Authenticate, SignUp, SignIn } from "../../services/AuthService";

export const postSignUp = async (req: Request, res: Response) => {
	
	const result = await SignUp({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	
	return res.status(result.status).json(result);
}

export const postSignIn = async (req: Request, res: Response) => {
	
	const result = await SignIn({
		email: req.body.email,
		password: req.body.password
	});

	return res.status(result.status).json(result);
}

export const postAuthenticate = async (req: Request, res: Response) => {

	const expReq = req as IExpressRequest;
	const user = expReq.decode as IUser;

	const result = await Authenticate(user.id);
	return res.status(result.status).json(result);
}