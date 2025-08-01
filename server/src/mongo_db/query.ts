import { Collection, Document } from "mongodb";
import { COLLECTION } from "src/constants";
import { client } from "./init";

interface QueryParams {
  collection_name: string;
  queryFn: (client: Collection<Document>) => any;
}
const query = async <T>({
  collection_name,
  queryFn,
}: QueryParams): Promise<T> => {
  const col = client.db(COLLECTION).collection(collection_name);

  const result = await queryFn(col);

  return result as T;
};

export default query;
