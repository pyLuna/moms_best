import { Router } from "express";
import { Roles } from "../../enums/roles";
import { createKey } from "../../service/metadata";
import {
  addUser,
  getUserByEmail,
  getUserPrivateData,
} from "../../service/user";
import { compare, encrypt } from "../../utils/hashing";
import Route from "../../utils/route";
import { generateToken } from "../../utils/tokens";

const router = Router();

router.post(Route.auth.login.email, async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserPrivateData(email);

  if (!user || !user?.password) {
    res.status(400).send({ message: "User not found." });
  }

  const isPasswordValid = await compare(password, user?.password!);

  if (!isPasswordValid) {
    res.status(400).send({ message: "Invalid password." });
  }

  const token = generateToken({ email, user_id: user?.user_id });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.send({ success: "true", token });
});

router.post(Route.auth.signup.email, async (req, res) => {
  const { email, password, role, ...others } = req.body;
  console.log("SignUp request data:", req.body);
  const result = await getUserByEmail(email);

  if (result) {
    res.status(400).send({ message: "Email already exists." });
  }

  const encryptedPassword = await encrypt(password);

  const userId = await addUser(email, encryptedPassword, others);

  const token = generateToken({ email, user_id: userId.toString() });

  const key = await createKey(userId.toString(), role as Roles);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.send({ success: true, key });
});

router.get(Route.user.logout, (req, res) => {
  res.clearCookie("token");
  res.send({ success: true });
});

export default router;
