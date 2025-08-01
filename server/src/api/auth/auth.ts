import { Response, Router } from "express";
import { Roles } from "../../enums/roles";
import {
  createKey,
  getUserMetadata,
  updateField,
  updateOnlineStatus,
} from "../../service/metadata";
import {
  addUser,
  getUserByEmail,
  getUserPrivateData,
} from "../../service/user";
import { compare, encrypt } from "../../utils/hashing";
import Route from "../../utils/route";
import { decodeToken } from "../../utils/tokens";

const router = Router();

const createToken = (
  res: Response,
  userId: string,
  email: string,
  role: Roles,
  remember: boolean
) => {
  const day = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const month = 30 * day; // 30 days in milliseconds

  const token = {
    user_id: userId,
    email: email,
    role: role,
  };
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: remember ? month : day, // 30 days or 1 day
  });
};

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

  if (!metadata || metadata?.key) {
    res.status(400).send({ error: "API key not found." });
    return;
  }

  updateField(user?.user_id!, {
    last_logged_in: new Date(),
    online: true,
    remember,
  });

  createToken(res, user?.toString(), email, metadata?.role, remember);

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

  const key = await createKey(userId.toString(), role as Roles);

  updateField(userId.toString(), {
    last_logged_in: new Date(),
    online: true,
    remember,
  });

  createToken(res, userId.toString(), email, key?.role, others.rememberMe);

  res.send({
    success: true,
    metadata: {
      key: key.key,
      role: key.role,
    },
  });
});

router.get(Route.user.logout, (req, res) => {
  const userData = decodeToken(req.cookies.token);
  updateOnlineStatus(userData?.user_id!, false);
  res.clearCookie("token");
  res.send({ success: true });
});

export default router;
