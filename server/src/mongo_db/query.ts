import { Collection, Document } from "mongodb";
import { client } from "./init";

interface QueryParams {
    database_name?: string,
    collection_name: string;
    queryFn: (client: Collection<Document>) => any
}
const query = async <T>({
    database_name,
    collection_name,
    queryFn
}: QueryParams): Promise<T> => {
    try {
        // Only connect if not already connected
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }

        const col = client.db(database_name || "moms_db").collection(collection_name);
        const result = await queryFn(col);
        
        return result as T;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}

export default query;