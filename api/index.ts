import { Router } from "express";

import { authRoutes } from "./routes/auth";
import { vehicleRoutes } from "./routes/vehicle";

export const loadRoutes = () => {

    const router = Router();

    authRoutes(router);
    vehicleRoutes(router);

    return router;
}
