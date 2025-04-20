import { Router } from "express";
import { client } from "../../mongo_db/init";

const router = Router();

router.get("/", async (req, res) => {

    const result = client.db("sample_mflix").collection("movies");

    const data = await result.find({}).limit(10).toArray();

    await client.close();

    res.json({
        message: "Hello from sample_mflix!",
        data: data
    });
});

export default router;