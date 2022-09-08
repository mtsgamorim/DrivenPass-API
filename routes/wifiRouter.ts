import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import validateTokenExists from "../middlewares/validateTokenExists.js";
import validateIdQueryMiddleware from "../middlewares/validateIdQueryMiddleware.js";
import validateIdParamMiddleware from "../middlewares/validateIdParamMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
import {
  createWifi,
  deleteWifi,
  getWifi,
} from "../controllers/wifiController.js";

const router = Router();

router.post(
  "/wifi",
  validateTokenExists,
  validateSchema(wifiSchema),
  createWifi
);

router.get("/wifi", validateTokenExists, validateIdQueryMiddleware, getWifi);

router.delete(
  "/wifi/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  deleteWifi
);

export default router;
