import { Request, Response } from "express";
import { IExpressRequest, IUser, IVehicle } from "../../utils/interfaces";

import { 
	CreateNewVehicle,
	PatchVehicle,
	GetAllVehicles,
	DeleteVehicle
} from "../../services/VehicleService";

export const postNewVehicle = async (req: Request, res: Response) => {

	const expReq = req as IExpressRequest;
	const user = expReq.decode as IUser;
	
	const result = await CreateNewVehicle(user.id, req.body as IVehicle);
	return res.status(result.status).json(result);
}

export const patchVehicle = async (req: Request, res: Response) => {
	
	const result = await PatchVehicle(req.params.id, req.body as IVehicle);
	return res.status(result.status).json(result);
}

export const getAllVehicles = async (req: Request, res: Response) => {

	const expReq = req as IExpressRequest;
	const user = expReq.decode as IUser;

	const result = await GetAllVehicles(user.id, req.query.searchQuery as string);
	return res.status(result.status).json(result);
}

export const deleteVehicle = async (req: Request, res: Response) => {
	
	const result = await DeleteVehicle(req.params.id);
	return res.status(result.status).json(result);
}