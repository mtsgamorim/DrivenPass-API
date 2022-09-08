import { Request, Response } from "express";
import * as cardsService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const {
    title,
    number,
    name,
    cvc,
    expirationDate,
    password,
    isVirtual,
    type,
  } = req.body;
  const token = res.locals.token;
  try {
    await cardsService.createCard(
      title,
      number,
      name,
      cvc,
      expirationDate,
      password,
      isVirtual,
      type,
      token
    );
  } catch (error) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(409).send("Titulo ja utilizado!");
  }

  res.sendStatus(201);
}

export async function getCards(req: Request, res: Response) {
  const id = Number(req.query.id);
  const token = res.locals.token;
  const result = await cardsService.getCards(id, token);
  res.status(200).send(result);
}

export async function deleteCard(req: Request, res: Response) {
  const id = Number(req.params.id);
  const token = res.locals.token;
  await cardsService.deleteCard(id, token);
  res.sendStatus(200);
}
