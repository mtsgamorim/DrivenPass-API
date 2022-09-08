import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import noteSchema from "../schemas/noteSchema.js";
import validateTokenExists from "../middlewares/validateTokenExists.js";
import validateIdQueryMiddleware from "../middlewares/validateIdQueryMiddleware.js";
import validateIdParamMiddleware from "../middlewares/validateIdParamMiddleware.js";
import {
  createNote,
  deleteNote,
  getNotes,
} from "../controllers/notesController.js";

const router = Router();

router.post(
  "/notes",
  validateTokenExists,
  validateSchema(noteSchema),
  createNote
);

router.get("/notes", validateTokenExists, validateIdQueryMiddleware, getNotes);

router.delete(
  "/notes/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  deleteNote
);

export default router;
