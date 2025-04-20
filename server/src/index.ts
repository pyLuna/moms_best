import express from "express";
import { config } from "dotenv";
import { PORT } from "./constants";
import sampleTest from "./api/test/sample_mflix";
import initMongoDB from "./mongo_db/init";
import auth from "./api/auth/email";

config({ path: ".env.development" });
// Load environment variables
// Passing a `path` to config() will set the path for that environment file
// change this path if you want to use a different file or don't pass anything to use `.env`
const app = express();
initMongoDB();

app.use(express.json());

app.use("/api/test", sampleTest);

app.use("/api/auth", auth);

app.listen(PORT, () => {
    console.log("Server is running on port,", PORT);
    console.log("ENV", process.env.DB_USER, process.env.DB_PASSWORD);
});