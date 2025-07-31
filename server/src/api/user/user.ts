import { Router } from "express";
import { authorize } from "../../middleware/verify/api.key";
import { getKeyByUserId } from "../../service/metadata";
import { getUserByEmail } from "../../service/user";
import Route from "../../utils/route";
import { decodeToken } from "../../utils/tokens";

const router = Router();

router.get(
  Route.user.get,
  authorize("read:users"), // Ensure the user has permission to read users
  async (req, res) => {
    const token = req.cookies.token;
    console.log("Token from request:", token);
    const userData = decodeToken(token)!;
    const key = await getKeyByUserId(userData.user_id);
    try {
      if (!key) {
        res.status(403).send({ error: "API key not found for user" });
        return;
      }
      const user = await getUserByEmail(userData.email);
      res.send({ user });
    } catch (error) {
      res.status(500).send({ message: "Error fetching user data" });
      return;
    }
  }
);

export default router;
