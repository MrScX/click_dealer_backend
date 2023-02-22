import { Request, Response } from "express";
import { IVehicle } from "../../utils/interfaces";

import { 
	CreateNewVehicle,
	PatchVehicle,
	GetAllVehicles,
	DeleteVehicle,
	GetVehicleById
} from "../../services/VehicleService";

export const postNewVehicle = async (req: Request, res: Response) => {
	
	const result = await CreateNewVehicle(req.body as IVehicle);
	return res.status(result.status).json(result);
}

export const patchVehicle = async (req: Request, res: Response) => {
	
	const result = await PatchVehicle(req.params.id, req.body as IVehicle);
	return res.status(result.status).json(result);
}

export const getAllVehicles = async (req: Request, res: Response) => {

	const result = await GetAllVehicles(req.query.lastVehicleId as string);
	return res.status(result.status).json(result);
}

export const deleteVehicle = async (req: Request, res: Response) => {
	
	const result = await DeleteVehicle(req.params.id);
	return res.status(result.status).json(result);
}

export const getVehicleById = async (req: Request, res: Response) => {
	
	const result = await GetVehicleById(req.params.id);
	return res.status(result.status).json(result);
}