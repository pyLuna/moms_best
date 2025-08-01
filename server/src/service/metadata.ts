import { ObjectId } from "mongodb";
import { Roles } from "../enums/roles";
import { METADATA } from "../mongo_db/collections";
import query from "../mongo_db/query";
import { Metadata } from "../types/metadata";
import { generateApiKey } from "../utils/hashing";

export const findKey = async (key?: string) => {
  if (!key) return null;
  const result = await query<Metadata>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.findOne({ key });
    },
  });
  if (!result) return null;
  return result;
};

export const getKeyByUserId = async (userId: string) => {
  const result = await query<Metadata>({
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
    console.warn("Metadata already exists, generating a new one.");
    throw new Error("Failed to create key: Metadata already exists");
  }

  const newKey: Metadata = {
    _id: new ObjectId(),
    role,
    key,
    last_logged_in: new Date(),
    created_at: new Date(),
    user_id: userId,
    online: true,
  };
  await query<Metadata>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.insertOne(newKey);
    },
  });
  return { ...newKey, key }; // Return the plain key for client use
};

export const updateField = async (user_id: string, value: any) => {
  await query<Metadata>({
    collection_name: METADATA,
    queryFn: async (client) => {
      return await client.updateOne({ user_id }, { $set: { ...value } });
    },
  });
};

export const updateLastLoggedIn = async (user_id: string) => {
  await updateField(user_id, { last_logged_in: new Date() });
};

export const updateOnlineStatus = async (user_id: string, online: boolean) => {
  await updateField(user_id, { online });
};
