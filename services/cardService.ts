import Cryptr from "cryptr";
import dotenv from "dotenv";
import { cards } from "@prisma/client";
import * as utilsService from "./utilsService.js";
import { CardTypes } from "../types/cardType.js";
import * as cardsRepositories from "../repositories/cardRepositories.js";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createCard(
  title: string,
  number: string,
  name: string,
  cvc: string,
  expirationDate: string,
  password: string,
  isVirtual: boolean,
  type: CardTypes,
  token: string
) {
  const id = await utilsService.verifyTokenReturnId(token);
  if (!id) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(id.id);
  const passwordEncrypted = cryptr.encrypt(password);
  const cvcEncrypted = cryptr.encrypt(cvc);
  const data = {
    title,
    number,
    name,
    cvc: cvcEncrypted,
    expirationDate,
    password: passwordEncrypted,
    isVirtual,
    type,
    userId,
  };
  await cardsRepositories.createCard(data);
}

export async function getCards(id: number | undefined, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);

  if (!id) {
    const cards = await cardsRepositories.getAllCardsByUserId(userId);
    cards.forEach((item) => {
      item.password = cryptr.decrypt(item.password);
      item.cvc = cryptr.decrypt(item.cvc);
    });
    return cards;
  }

  const card = await cardsRepositories.getCardById(id);
  if (!card) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyCard(card, userId);
  card.password = cryptr.decrypt(card.password);
  card.cvc = cryptr.decrypt(card.cvc);
  return card;
}

function verifyCard(card: cards, userId: number) {
  if (card.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Essa credencial não pertence a você",
    };
  }
}

export async function deleteCard(id: number, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);
  const card = await cardsRepositories.getCardById(id);
  if (!card) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyCard(card, userId);
  await cardsRepositories.deleteCard(id);
}
