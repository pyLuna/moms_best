import express from "express";

const app = express();

app.get("/hello-world", (req, res) => {
    res.send({
        message: "Hello World"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})