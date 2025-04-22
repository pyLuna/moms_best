import { Collection, Document } from "mongodb";
import { client } from "./init";

interface QueryParams {
    collection_name: string;
    queryFn: (client: Collection<Document>) => any
}
const query = async <T>({
    collection_name,
    queryFn
}: QueryParams): Promise<T> => {
    await client.connect();

    const col = client.db("moms_db").collection(collection_name);

    const result = await queryFn(col);

    await client.close();

    return result as T;
}

export default query;