import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
  const { title, name, password } = req.body;
  const token = res.locals.token;
  try {
    await wifiService.createWifi(title, name, password, token);
  } catch (error) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(409).send("Titulo ja utilizado!");
  }

  res.sendStatus(201);
}

export async function getWifi(req: Request, res: Response) {
  const id = Number(req.query.id);
  const token = res.locals.token;
  const result = await wifiService.getWifi(id, token);
  res.status(200).send(result);
}

export async function deleteWifi(req: Request, res: Response) {
  const id = Number(req.params.id);
  const token = res.locals.token;
  await wifiService.deleteWifi(id, token);
  res.sendStatus(200);
}
