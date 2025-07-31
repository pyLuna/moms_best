import { Router } from "express";
import { Roles } from "../../enums/roles";
import { createKey, getKeyByUserId } from "../../service/metadata";
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
    res.status(400).send({ error: "User not found." });
    return;
  }

  const isPasswordValid = await compare(password, user?.password!);

  if (!isPasswordValid) {
    res.status(400).send({ error: "Invalid password." });
    return;
  }

  const token = generateToken({ email, user_id: user?.user_id });
  const key = await getKeyByUserId(user?.user_id!);

  if (!key) {
    res.status(400).send({ error: "API key not found." });
    return;
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.send({
    success: "true",
    metadata: {
      key: key!.key,
      role: key!.role,
    },
  });
});

router.post(Route.auth.signup.email, async (req, res, next) => {
  const { email, password, role, ...others } = req.body;

  const result = await getUserByEmail(email);

  if (result) {
    console.log("Email already exists:", email);
    res.status(400).send({ error: "Email already exists." });
    return;
  }
  console.log("Creating new user:", email);
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

  res.send({
    success: true,
    metadata: {
      key: key.key,
      role: key.role,
    },
  });
});

router.get(Route.user.logout, (req, res) => {
  res.clearCookie("token");
  res.send({ success: true });
});

export default router;
