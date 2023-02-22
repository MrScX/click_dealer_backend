import { Router, IRouter } from "express";

import { isAuth } from "../middlewares/auth";

import { getPreSignedUrl } from "../controllers/upload";

const router = Router();

export const uploadRoutes = (app: IRouter) => {

    router.get("/s3-signed-url", getPreSignedUrl);

    app.use("/upload", isAuth, router);
}