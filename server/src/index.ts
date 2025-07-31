import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import serverless from "serverless-http";
import auth from "./api/auth/email";
import user from "./api/user/user";
import { PORT } from "./constants";
import { verifyApiKey } from "./middleware/verify/api.key";
import { verifyAuthorization } from "./middleware/verify/auth";
import initMongoDB from "./mongo_db/init";
import { wrapAsync } from "./utils/misc";

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
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(verifyAuthorization, wrapAsync(verifyApiKey));

app.use("/user", user);

app.use("/auth", auth);

// Export the app for serverless deployment

// Only start the server if not in serverless environment bump
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Allowed Origins:", process.env.ALLOWED_ORIGINS);
    console.log("Server is running on port,", PORT);
    console.log("ENV", process.env.DB_USER, process.env.DB_PASSWORD);
  });
}

module.exports = app;
module.exports.handler = serverless(app);
