import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import validateTokenExists from "../middlewares/validateTokenExists.js";
import validateIdQueryMiddleware from "../middlewares/validateIdQueryMiddleware.js";
import validateIdParamMiddleware from "../middlewares/validateIdParamMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import {
  createCard,
  deleteCard,
  getCards,
} from "../controllers/cardController.js";

const router = Router();

router.post(
  "/cards",
  validateTokenExists,
  validateSchema(cardSchema),
  createCard
);

router.get("/cards", validateTokenExists, validateIdQueryMiddleware, getCards);

router.delete(
  "/cards/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  deleteCard
);

export default router;
