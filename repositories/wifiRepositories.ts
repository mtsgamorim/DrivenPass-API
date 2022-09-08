import client from "../db/prismaClient.js";
import { wifi } from "@prisma/client";

type CreateWifiData = Omit<wifi, "id">;

export async function createWifi(data: CreateWifiData) {
  await client.wifi.create({ data });
}

export async function getAllWifiByUserId(userId: number) {
  const wifi = await client.wifi.findMany({
    where: {
      userId: userId,
    },
  });
  return wifi;
}

export async function getWifiById(id: number) {
  const wifi = await client.wifi.findFirst({
    where: {
      id: id,
    },
  });
  return wifi;
}

export async function deleteWifi(id: number) {
  await client.wifi.delete({
    where: {
      id: id,
    },
  });
}
