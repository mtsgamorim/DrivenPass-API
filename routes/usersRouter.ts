import { Router } from "express";
import { createUser, login } from "../controllers/usersControllers.js";
import validateSchema from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), createUser);
router.post("/sign-in", validateSchema(userSchema), login);

export default router;
