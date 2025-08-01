import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;
const initMongoDB = async () => {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@main.nttg7ye.mongodb.net/?retryWrites=true&w=majority&appName=main`;
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  console.log("Connected to MongoDB, dbName:", client.options.dbName);
};

export default initMongoDB;
export { client };
