import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;
const initMongoDB = async () => {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@main.nttg7ye.mongodb.net/?retryWrites=true&w=majority&appName=main`;
    console.log("Connecting to MongoDB", uri);
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
}

export default initMongoDB;
export { client };