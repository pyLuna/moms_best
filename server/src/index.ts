import cors from "cors";
import { config } from "dotenv";
import express from "express";
import auth from "./api/auth/email";
import sampleTest from "./api/test/sample_mflix";
import user from "./api/user/user";
import { PORT } from "./constants";
import { verifyAuthorization } from "./middleware/global";
import initMongoDB from "./mongo_db/init";

config({ path: ".env.development" });
// Load environment variables
// Passing a `path` to config() will set the path for that environment file
// change this path if you want to use a different file or don't pass anything to use `.env`
const app = express();
initMongoDB();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());

app.use(cors(corsOptions));

app.use(verifyAuthorization);

app.use("/test", sampleTest);

app.use("/user", user);

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log("Server is running on port,", PORT);
  console.log("ENV", process.env.DB_USER, process.env.DB_PASSWORD);
});
