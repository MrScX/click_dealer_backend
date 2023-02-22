import { Router } from "express";

import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { vehicleRoutes } from "./routes/vehicle";

export const loadRoutes = () => {

    const router = Router();

    authRoutes(router);
    vehicleRoutes(router);
	uploadRoutes(router);

    return router;
}
