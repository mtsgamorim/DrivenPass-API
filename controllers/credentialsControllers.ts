import { request, Request, Response } from "express";
import * as credentialsService from "../services/credentialsService.js";

export async function createCredentials(req: Request, res: Response) {
  const { title, url, username, password } = req.body;
  const token = res.locals.token;
  try {
    await credentialsService.createCredential(
      title,
      url,
      username,
      password,
      token
    );
  } catch (error) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(409).send("Titulo ja utilizado!");
  }

  res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
  const id = Number(req.query.id);
  const token = res.locals.token;
  const result = await credentialsService.getCredentials(id, token);
  res.status(200).send(result);
}

export async function deleteCredential(req: Request, res: Response) {
  const id = Number(req.params.id);
  const token = res.locals.token;
  await credentialsService.deleteCredential(id, token);
  res.sendStatus(200);
}
