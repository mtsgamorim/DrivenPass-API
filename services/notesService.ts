import * as utilsService from "./utilsService.js";
import * as notesRepositories from "../repositories/notesRepositories.js";
import { notes } from "@prisma/client";

export async function createCredential(
  title: string,
  note: string,
  token: string
) {
  const id = await utilsService.verifyTokenReturnId(token);
  if (!id) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(id.id);
  const data = {
    title,
    note,
    userId,
  };
  await notesRepositories.createNote(data);
}

export async function getNotes(id: number | undefined, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);

  if (!id) {
    const notes = await notesRepositories.getAllNotesByUserId(userId);
    return notes;
  }

  const note = await notesRepositories.getNotesById(id);
  if (!note) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyNote(note, userId);
  return note;
}

function verifyNote(notes: notes, userId: number) {
  if (notes.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Essa credencial não pertence a você",
    };
  }
}

export async function deleteNote(id: number, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);
  const note = await notesRepositories.getNotesById(id);
  if (!note) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyNote(note, userId);
  await notesRepositories.deleteNote(id);
}
