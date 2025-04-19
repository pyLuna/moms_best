import express from "express";
import initFirebase from "./firebase/init";
import { config } from "dotenv";
import { PORT } from "./constants";

// Load environment variables
// Passing a `path` to config() will set the path for that environment file
const configResult = config({ path: ".env.development" });
const app = express();
const firebaseAdminApp = initFirebase();

app.get("/hello-world", (req, res) => {
    res.send({
        message: "Hello World"
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port,", PORT);
    console.log("Firebase initialized", firebaseAdminApp);
    console.log("Environment variables", configResult);
})