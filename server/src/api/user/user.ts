import { Router } from "express";
import { authorize } from "../../middleware/verify/api.key";
import { getUserByEmail } from "../../service/user";
import Route from "../../utils/route";
import { decodeToken } from "../../utils/tokens";

const router = Router();

router.get(
  Route.user.get,
  authorize("read:users"), // Ensure the user has permission to read users
  async (req, res) => {
    const token = req.cookies.token;
    console.log("Router: Token from request:", token);
    const userData = decodeToken(token)!;

    console.log("userData:", userData);

    const user = await getUserByEmail(userData.email);
    res.send({ user });
    return;
  }
);

export default router;
