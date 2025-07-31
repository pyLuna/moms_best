import { ObjectId } from "mongodb";
import { Roles } from "../enums/roles";
import { METADATA } from "../mongo_db/collections";
import query from "../mongo_db/query";
import { Key } from "../types/key";
import { generateApiKey } from "../utils/hashing";

export const findKey = async (key?: string) => {
  if (!key) return null;
  const result = await query<Key>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.findOne({ key });
    },
  });
  if (!result) return null;
  return result;
};

export const getKeyByUserId = async (userId: string) => {
  const result = await query<Key>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.findOne({ user_id: userId });
    },
  });
  if (!result) return null;
  return result;
};

export const createKey = async (userId: string, role: Roles) => {
  const key = await generateApiKey();
  console.log("Generated API key:", key);
  const existingKey = await findKey(key);
  if (existingKey) {
    console.warn("Key already exists, generating a new one.");
    throw new Error("Failed to create key: Key already exists");
  }

  const newKey: Key = {
    _id: new ObjectId(),
    role,
    key,
    lastLoggedIn: new Date(),
    createdAt: new Date().toISOString(),
    user_id: userId,
  };
  await query<Key>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.insertOne(newKey);
    },
  });
  return newKey;
};
