import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import credentialSchema from "../schemas/credentialSchema.js";
import validateTokenExists from "../middlewares/validateTokenExists.js";
import {
  createCredentials,
  deleteCredential,
  getCredentials,
} from "../controllers/credentialsControllers.js";
import validateIdQueryMiddleware from "../middlewares/validateIdQueryMiddleware.js";
import validateIdParamMiddleware from "../middlewares/validateIdParamMiddleware.js";

const router = Router();

router.post(
  "/credentials",
  validateTokenExists,
  validateSchema(credentialSchema),
  createCredentials
);

router.get(
  "/credentials",
  validateTokenExists,
  validateIdQueryMiddleware,
  getCredentials
);

router.delete(
  "/credentials/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  deleteCredential
);

export default router;
