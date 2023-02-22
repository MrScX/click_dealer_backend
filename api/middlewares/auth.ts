import { Request, Response, NextFunction } from "express";
import { logger } from "../../loaders/logger";
import { decodeAuthToken } from "../../services/AuthService";
import { IExpressRequest } from "../../utils/interfaces";

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {

	const expReq = req as IExpressRequest;

	const token = expReq.headers["authorization"] ? expReq.headers["authorization"].split(" ")[1] : null;
	
	if (token) {

		expReq.token = token;
		const decode = decodeAuthToken(expReq.token);
	
		if (!decode.tokenValid) {
			return res.status(401).json({ unauthorized: true });
		} else {
	
			expReq.isAuth = true;
			expReq.decode = decode.data;
	
			return next();
		}
	}
	
	return next();
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {

	const expReq = req as IExpressRequest;

    if (!expReq.isAuth) {
        logger.error(`[UNAUTHORIZED ACTION ${expReq.path}] ip: ${expReq.ip}`);
        return res.status(401).json({ unauthorized: true });
    }

    return next();
}