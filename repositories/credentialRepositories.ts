import client from "../db/prismaClient.js";
import { credentials } from "@prisma/client";

type CreateCredentialData = Omit<credentials, "id">;

export async function createCredentials(data: CreateCredentialData) {
  await client.credentials.create({ data });
}

export async function getAllCredentialsByUserId(userId: number) {
  const credentials = await client.credentials.findMany({
    where: {
      userId: userId,
    },
  });
  return credentials;
}

export async function getCredentialsById(id: number) {
  const credentials = await client.credentials.findFirst({
    where: {
      id: id,
    },
  });
  return credentials;
}

export async function deleteCredential(id: number) {
  await client.credentials.delete({
    where: {
      id: id,
    },
  });
}
