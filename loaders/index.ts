import dotenv from "dotenv";
import { Express } from 'express';
import { loadDatabase } from "./database";
import { expressLoader } from "./express";

export const loader = (app: Express) => {

    dotenv.config();
    
    loadDatabase();
    expressLoader(app);
}