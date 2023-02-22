import mongoose from "mongoose";
import { vehicleStatus } from "../utils/const";
import { IVehicle } from "../utils/interfaces";

const VehicleSchema = new mongoose.Schema<IVehicle>({
	make: String,
	model: String,
	year: String,
	color: String,
	price: Number,
	description: String,
	img_url: String,
	registration: String,
	registration_date: Date,
	status: { type: Number, default: vehicleStatus.AVAILABLE },
	created_by: String,
	created_at: { type: Date, default: Date.now },
});

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
