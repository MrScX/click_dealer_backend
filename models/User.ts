import mongoose from "mongoose";
import { userStatus } from "../utils/const";
import { IUser } from "../utils/interfaces";

const UserSchema = new mongoose.Schema<IUser>({
	name: String,
	email: String,
	password: String,
	last_login: Date,
	created_at: { type: Date, default: Date.now },
	status: { type: Number, default: userStatus.PENDING },
});

export const User = mongoose.model("User", UserSchema);
