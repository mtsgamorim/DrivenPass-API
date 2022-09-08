import client from "../db/prismaClient.js";
import { notes } from "@prisma/client";

type CreateNoteData = Omit<notes, "id">;

export async function createNote(data: CreateNoteData) {
  await client.notes.create({ data });
}

export async function getAllNotesByUserId(userId: number) {
  const notes = await client.notes.findMany({
    where: {
      userId: userId,
    },
  });
  return notes;
}

export async function getNotesById(id: number) {
  const notes = await client.notes.findFirst({
    where: {
      id: id,
    },
  });
  return notes;
}

export async function deleteNote(id: number) {
  await client.notes.delete({
    where: {
      id: id,
    },
  });
}
