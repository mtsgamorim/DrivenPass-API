import { Request, Response, NextFunction } from "express";

export default function validateIdQueryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.query.id;
  const numberId = Number(id);
  if (id && isNaN(numberId)) {
    throw { type: "badRequest", message: "Id deve ser um número" };
  }
  next();
}
