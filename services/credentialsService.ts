import Cryptr from "cryptr";
import dotenv from "dotenv";
import { credentials } from "@prisma/client";
import * as utilsService from "./utilsService.js";
import * as credentialRepositories from "../repositories/credentialRepositories.js";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createCredential(
  title: string,
  url: string,
  username: string,
  password: string,
  token: string
) {
  const id = await utilsService.verifyTokenReturnId(token);
  const userId = Number(id.id);
  if (!userId) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const passwordEncrypted = cryptr.encrypt(password);
  const data = {
    title,
    url,
    username,
    userId,
    password: passwordEncrypted,
  };
  await credentialRepositories.createCredentials(data);
}

export async function getCredentials(id: number | undefined, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);

  if (!id) {
    const credentials = await credentialRepositories.getAllCredentialsByUserId(
      userId
    );
    credentials.forEach(
      (item) => (item.password = cryptr.decrypt(item.password))
    );
    return credentials;
  }

  const credentials = await credentialRepositories.getCredentialsById(id);
  if (!credentials) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyCredentials(credentials, userId);
  credentials.password = cryptr.decrypt(credentials.password);
  return credentials;
}

function verifyCredentials(credentials: credentials, userId: number) {
  if (credentials.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Essa credencial não pertence a você",
    };
  }
}

export async function deleteCredential(id: number, token: string) {
  const userIdNotNumber = await utilsService.verifyTokenReturnId(token);
  if (!userIdNotNumber) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const userId = Number(userIdNotNumber.id);
  const credentials = await credentialRepositories.getCredentialsById(id);
  if (!credentials) {
    throw { type: "badRequest", message: "Credencial não encontrada" };
  }
  verifyCredentials(credentials, userId);
  await credentialRepositories.deleteCredential(id);
}
