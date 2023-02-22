
import { Vehicle } from "../models/Vehicle";
import { logger } from "../loaders/logger";
import { IVehicle } from "../utils/interfaces";
import mongoose from "mongoose";

export const CreateNewVehicle = async (data: IVehicle) => {

	try {

		const vehicle = new Vehicle(data);
		await vehicle.save();

		return { status: 200, vehicle };
	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const PatchVehicle = async (id: string | undefined, data: IVehicle) => {
	try {

		const vehicle = await Vehicle.findOneAndUpdate(
			{ _id: id }, data, { new: true }
		);

		return { status: 200, vehicle };

	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const GetAllVehicles = async (lastVehicleId: string | undefined) => {
	try {

		if (lastVehicleId) {
			const isValidId = mongoose.Types.ObjectId.isValid(lastVehicleId);

			if (!isValidId) {
				return { status: 400, message: "Invalid ID" };
			}
		}

		const MAX_LIMIT = 15;

		let vehicles: IVehicle[] = [];

		const count = await Vehicle.countDocuments();

		if (!lastVehicleId) {
			vehicles = await Vehicle.find()
				.sort({ _id: 1 })
				.limit(MAX_LIMIT);
		} else {
			vehicles = await Vehicle.find({ _id: { $gt: lastVehicleId } })
				.sort({ _id: 1 })
				.limit(MAX_LIMIT);
		}

		return { 
			status: 200,
			data: {
				count,
				vehicles,
				hasMore: vehicles.length === MAX_LIMIT
			}
		};

	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const DeleteVehicle = async (id: string) => {
	try {

		await Vehicle.deleteOne({ _id: id });
		return { status: 200 };

	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const GetVehicleById = async (id: string) => {
	try {

		const isValidId = mongoose.Types.ObjectId.isValid(id);

		if (!isValidId) {
			return { status: 400, msg: "Invalid ID" };
		}

		const vehicle = await Vehicle.findById(id);

		if (!vehicle) {
			return { status: 404 };
		}

		return { status: 200, vehicle };

	} catch (err) {
		logger.error(err);
		return { status: 500, message: "Internal Server Error" };
	}
}