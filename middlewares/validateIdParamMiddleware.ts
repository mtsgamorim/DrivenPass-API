import { Request, Response, NextFunction } from "express";

export default function validateIdParamMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const numberId = Number(id);
  if (isNaN(numberId)) {
    throw { type: "badRequest", message: "Id deve ser um número" };
  }
  next();
}
