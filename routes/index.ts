import { Router } from "express";

import usersRouter from "./usersRouter.js";

const routes = Router();

routes.use(usersRouter);

export default routes;
