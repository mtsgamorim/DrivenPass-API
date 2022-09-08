import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNote(req: Request, res: Response) {
  const { title, note } = req.body;
  const token = res.locals.token;
  try {
    await notesService.createCredential(title, note, token);
  } catch (error) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(409).send("Titulo ja utilizado!");
  }

  res.sendStatus(201);
}

export async function getNotes(req: Request, res: Response) {
  const id = Number(req.query.id);
  const token = res.locals.token;
  const result = await notesService.getNotes(id, token);
  res.status(200).send(result);
}

export async function deleteNote(req: Request, res: Response) {
  const id = Number(req.params.id);
  const token = res.locals.token;
  await notesService.deleteNote(id, token);
  res.sendStatus(200);
}
