import { Router } from "express";

import cartController from "../controllers/cart.controller";
import authMiddleware from '../middlewares/auth.middleware';

const cartRoutes = Router();

cartRoutes.post("/checkout", authMiddleware(), cartController.checkout);

export { cartRoutes };
