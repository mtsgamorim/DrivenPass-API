import { Router } from "express";

import usersRouter from "./usersRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import notesRouter from "./notesRouter.js";
import cardRouter from "./cardRouter.js";

const routes = Router();

routes.use(usersRouter);
routes.use(credentialsRouter);
routes.use(notesRouter);
routes.use(cardRouter);

export default routes;
