import { Router } from "express";
import { addUser, getUserByEmail, getUserPasswordByEmail } from "@/service/user";
import { compare, encrypt } from "@/utils/hashing";
import { generateToken } from "@/utils/tokens";

const router = Router();

router.post("/email", async (req, res) => {
    const { email, password } = req.body;

    const passwordFromDB = await getUserPasswordByEmail(email);

    if (!passwordFromDB) {
        res.status(400).send({ "message": "User not found." });
    }

    const isPasswordValid = await compare(password, passwordFromDB!);

    if (!isPasswordValid) {
        res.status(400).send({ "message": "Invalid password." });
    }

    const token = generateToken(email);
    res.cookie("token", token, { httpOnly: true });

    res.send({ "success": "true", token })
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const result = await getUserByEmail(email);

    if (result) {
        res.status(400).send({ "message": "Email already exists." });
    }

    const encryptedPassword = await encrypt(password);

    const userId = await addUser(email, encryptedPassword);

    const token = generateToken(userId.toString());

    res.cookie("token", token, { httpOnly: true });

    res.send({ "success": true, token });
})

export default router;