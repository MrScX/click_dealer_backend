import express from "express";

import { loader } from "./loaders";
import { logger } from "./loaders/logger";

const startServer = () => {

	const app = express();

	loader(app);

	app.listen(process.env.PORT, () => {
		console.log(`
            ####################################
            🛡️  Server listening on port: ${process.env.PORT} 🛡️
            ####################################
        `);
	});

	app.on("error", (err) => {
		logger.error(err);
		process.exit(1);
	});
}

startServer();