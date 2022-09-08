import Cryptr from "cryptr";
import dotenv from "dotenv";
import { wifi } from "@prisma/client";
import * as utilsService from "./utilsService.js";
import * as wifiRepositories from "../repositories/wifiRepositories.js";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createWifi(
  title: string,
  name: string,
  password: string,
  token: string
) {
  const id = await utilsService.verifyTokenReturnId(token);
  if (!id) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(id.id);
  const passwordEncrypted = cryptr.encrypt(password);
  const data = {
    title,
    name,
    password: passwordEncrypted,
    userId,
  };
  await wifiRepositories.createWifi(data);
}

export async function getWifi(id: number | undefined, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);

  if (!id) {
    const wifi = await wifiRepositories.getAllWifiByUserId(userId);
    wifi.forEach((item) => {
      item.password = cryptr.decrypt(item.password);
    });
    return wifi;
  }

  const wifi = await wifiRepositories.getWifiById(id);
  if (!wifi) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyWifi(wifi, userId);
  wifi.password = cryptr.decrypt(wifi.password);
  return wifi;
}

function verifyWifi(wifi: wifi, userId: number) {
  if (wifi.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Essa credencial não pertence a você",
    };
  }
}

export async function deleteWifi(id: number, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);
  const wifi = await wifiRepositories.getWifiById(id);
  if (!wifi) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyWifi(wifi, userId);
  await wifiRepositories.deleteWifi(id);
}
