import { Router } from "express";
import { getUserByEmail } from "src/service/user";
import Route from "src/utils/route";
import { decodeToken } from "src/utils/tokens";

const router = Router();

router.get(Route.user.get, async (req, res) => {
  const token = req.cookies.token;
  console.log("Token from request:", token);
  const userData = decodeToken(token)!;

  try {
    const user = await getUserByEmail(userData.email);
    res.send({ user });
  } catch (error) {
    res.status(500).send({ message: "Error fetching user data" });
  }
});

export default router;
