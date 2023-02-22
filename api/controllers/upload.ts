import { Request, Response } from "express";
import { IExpressRequest, IUser } from "../../utils/interfaces";
import { GenerateS3PreSignedURL } from "../../services/UploadService";

export const getPreSignedUrl = async (req: Request, res: Response) => {

	const expReq = req as IExpressRequest;

	const data = {
		type: req.query.type, 
		name: req.query.name, 
		folder: req.query.folder ? req.query.folder : "" 
	};

	const result = await GenerateS3PreSignedURL(data, expReq.decode as IUser);
	return res.status(result.status).json(result);
}