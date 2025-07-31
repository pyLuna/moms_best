import { API_KEY } from "../mongo_db/collections";
import query from "../mongo_db/query";
import { Key } from "../types/key";

export const findKey = async (key?: string) => {
  if (!key) return null;
  const result = await query<Key>({
    collection_name: API_KEY,
    queryFn: async (client) => {
      return await client.findOne({ key });
    },
  });
  if (!result) return null;
  return result;
};
