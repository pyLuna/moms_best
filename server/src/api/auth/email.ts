import { Router } from "express";
import { addUser, getUserByEmail } from "@/service/user";
import { compare, encrypt } from "@/utils/hashing";
import { generateToken } from "@/utils/tokens";
import { client } from "@/mongo_db/init";

const router = Router();

router.post("/email", async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
        res.status(400).send({ "message": "User not found." });
    }

    const isPasswordValid = await compare(password, user?.password);

    if (!isPasswordValid) {
        res.status(400).send({ "message": "Invalid password." });
    }

    res.send({ "success": "true" })
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const result = await getUserByEmail(email);

    if (result) {
        res.status(400).send({ "message": "Email already exists." });
    }

    const encryptedPassword = await encrypt(password);

    const user = await addUser(email, encryptedPassword);

    const token = generateToken(user.toString());

    res.cookie("token", token, { httpOnly: true });

    res.send({ "success": true, });
})

export default router;