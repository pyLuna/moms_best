import { Document, InsertOneResult } from "mongodb";
import { USERS, USERS_PRIVATE } from "../../mongo_db/collections";
import query from "../../mongo_db/query";
import { User, UsersPrivate } from "../../types/user/users";

const getUserByEmail = async (email: string) => {
  const result = await query<User>({
    collection_name: USERS,
    queryFn: async (client) => {
      return await client.findOne({ email });
    },
  });
  return result;
};

const addUser = async (
  email: string,
  password: string,
  data: Record<string, any>
) => {
  const useResult = await query<InsertOneResult<Document>>({
    collection_name: USERS,
    queryFn: async (client) => {
      return await client.insertOne({ email, ...data });
    },
  });
  await addUserPrivate({ user_id: useResult.insertedId.toString(), password });
  return useResult.insertedId;
};

const addUserPrivate = async (privateData: UsersPrivate) => {
  if (
    privateData.user_id === undefined ||
    privateData.password === null ||
    privateData.password === ""
  )
    return;
  await query<User>({
    collection_name: USERS_PRIVATE,
    queryFn: async (client) => {
      return await client.insertOne(privateData);
    },
  });
};

const getUserPrivateData = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) return null;

  const result = await query<UsersPrivate>({
    collection_name: USERS_PRIVATE,
    queryFn: async (client) => {
      return await client.findOne({ user_id: user._id.toString() });
    },
  });
  return result;
};

export { addUser, getUserByEmail, getUserPrivateData };
