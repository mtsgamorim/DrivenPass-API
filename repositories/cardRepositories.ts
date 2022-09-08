import client from "../db/prismaClient.js";
import { cards } from "@prisma/client";

type CreateCardData = Omit<cards, "id">;

export async function createCard(data: CreateCardData) {
  await client.cards.create({ data });
}

export async function getAllCardsByUserId(userId: number) {
  const cards = await client.cards.findMany({
    where: {
      userId: userId,
    },
  });
  return cards;
}

export async function getCardById(id: number) {
  const card = await client.cards.findFirst({
    where: {
      id: id,
    },
  });
  return card;
}

export async function deleteCard(id: number) {
  await client.cards.delete({
    where: {
      id: id,
    },
  });
}
