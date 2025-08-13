import { Router } from "express";
import { Roles } from "../enums/roles";
import {
  addUser,
  getUserByEmail,
  getUserPrivateData,
} from "../service/user/user";
import {
  createMetadata,
  getUserMetadata,
  updateField,
  updateOnlineStatus,
} from "../service/user/user.metadata";
import { compare, encrypt } from "../utils/hashing";
import Route from "../utils/route";
import { decodeToken, generateToken } from "../utils/tokens";

const router = Router();

const day = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const month = 30 * day; // 30 days in milliseconds

router.post(Route.auth.login.email, async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const remember = rememberMe === "on";
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

  const metadata = await getUserMetadata(user?.user_id!);
  console.log("Metadata found:", metadata);
  if (!metadata || !metadata?.key) {
    res.status(400).send({ error: "API key not found." });
    return;
  }

  updateField(user?.user_id!, {
    last_logged_in: new Date(),
    online: true,
    remember,
  });

  const token = generateToken({
    user_id: user?.user_id!,
    email: email,
    role: metadata.role,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: remember ? month : day, // 30 days or 1 day
  });
  res.send({
    success: "true",
    metadata: {
      key: metadata!.key,
      role: metadata!.role,
    },
  });
});

router.post(Route.auth.signup.email, async (req, res) => {
  const { email, password, role, ...others } = req.body;
  const remember = others.rememberMe === "on";
  const result = await getUserByEmail(email);

  if (result) {
    console.log("Email already exists:", email);
    res.status(400).send({ error: "Email already exists." });
    return;
  }
  console.log("Creating new user:", email);
  const encryptedPassword = await encrypt(password);

  const userId = await addUser(email, encryptedPassword, others);

  const metadata = await createMetadata(userId.toString(), role as Roles);

  updateField(userId.toString(), {
    last_logged_in: new Date(),
    online: true,
    remember,
  });

  const token = generateToken({
    user_id: userId.toString(),
    email: email,
    role: metadata.role,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: remember ? month : day, // 30 days or 1 day
  });

  res.send({
    success: true,
    metadata: {
      role: metadata.role,
    },
  });
});

router.get(Route.user.logout, (req, res) => {
  const userData = decodeToken(req.cookies.token);
  updateOnlineStatus(userData?.user_id!, false);
  res.clearCookie("token");
  (req as any).key = null;
  (req as any).role = null;
  res.send({ success: true });
});

export default router;
