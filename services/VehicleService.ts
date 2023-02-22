
import { Vehicle } from "../models/Vehicle";
import { logger } from "../loaders/logger";
import { IVehicle } from "../utils/interfaces";

export const CreateNewVehicle = async (u_id: string, data: IVehicle) => {

	try {

		const vehicle = new Vehicle({ ...data, created_by: u_id });
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

export const GetAllVehicles = async (u_id: string, searchQuery: string) => {
	try {

		if (!u_id) {
			return { status: 400, message: "Invalid ID" };
		}

		let dbSearchQuery = {};

		if (searchQuery) {
			dbSearchQuery = {
				$or: [
					{ make: { $regex: `.*${searchQuery}.*`, $options: "i" } },
					{ model: { $regex: `.*${searchQuery}.*`, $options: "i" } },
					{ year: { $regex: `.*${searchQuery}.*`, $options: "i" } },
					{ color: { $regex: `.*${searchQuery}.*`, $options: "i" } },
					{ description: { $regex: `.*${searchQuery}.*`, $options: "i" } },
					{ registration: { $regex: `.*${searchQuery}.*`, $options: "i" } },
				]
			};
		}

		const vehicles = await Vehicle
			.find({
				...dbSearchQuery,
				created_by: u_id,
			})
			.sort({ created_at: -1 });

		return {
			status: 200,
			vehicles
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