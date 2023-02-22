import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface LooseObject {
	[key: string]: any
};

export interface IExpressRequest extends Request {
	token: string;
	isAuth: boolean;
	decode: string | JwtPayload | undefined;
};

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	status?: number;
	last_login?: Date;
	created_at?: Date;
};

export interface IVehicle {
	id?: string;
	make: string;
	model: string;
	year: string;
	color: string;
	price: number;
	registration?: string;
	registration_date?: Date;
	status?: number;
	created_by: string;
	created_at?: Date;
};

export interface ISignIn {
	email: string;
	password: string;
};