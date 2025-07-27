import serverless from "serverless-http";
import app from "./index";

// Add a catch-all route handler
app.get("/.netlify/functions/netlify", (req, res) => {
  res.json({ message: "Netlify function is working" });
});

export const handler = serverless(app, {
  basePath: "/.netlify/functions/netlify",
});
