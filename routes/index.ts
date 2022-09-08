import { Router } from "express";

import usersRouter from "./usersRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const routes = Router();

routes.use(usersRouter);
routes.use(credentialsRouter);

export default routes;
