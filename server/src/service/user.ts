import { USERS } from "@/mongo_db/collections";
import { client } from "@/mongo_db/init";

const getUserByEmail = async (email: string) => {
    await client.connect();
    const collection = client.db("moms_db").collection(USERS);
    const user = await collection.findOne({ email });
    await client.close();
    return user;
}

const addUser = async (email: string, password: string) => {
    await client.connect();
    const collection = client.db("moms_db").collection(USERS);
    const result = await collection.insertOne({ email, password });
    await client.close();

    return result.insertedId;
}

export { getUserByEmail, addUser };