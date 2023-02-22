export const MONGO_CONN_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mrscxcluster.6d2zwth.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export enum userStatus {
	PENDING = 0,
	ACTIVE = 1,
	DISABLED = 2,
};

export enum vehicleStatus {
	AVAILABLE = 1,
	DISCONTINUED = 2,
};