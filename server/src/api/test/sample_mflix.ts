import { Router } from "express";
import { client } from "../../mongo_db/init";
import query from "@/mongo_db/query";

const router = Router();

router.get("/", async (req, res) => {

    const data = await query({
        database_name: "sample_mflix",
        collection_name: "movies",
        queryFn: async (client) => {
            return await client.find({}).limit(10).toArray();
        },
    })

    res.json({
        message: "Hello from sample_mflix!",
        data: data
    });
});

export default router;