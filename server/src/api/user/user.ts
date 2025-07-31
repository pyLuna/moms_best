import { Router } from "express";
import { authorize } from "src/middleware/verify/api.key";
import { wrapAsync } from "src/utils/misc";
import { getUserByEmail } from "../../service/user";
import Route from "../../utils/route";
import { decodeToken } from "../../utils/tokens";

const router = Router();

router.get(
  Route.user.get,
  wrapAsync(authorize("read:users")), // Ensure the user has permission to read users
  async (req, res) => {
    const token = req.cookies.token;
    console.log("Token from request:", token);
    const userData = decodeToken(token)!;

    try {
      const user = await getUserByEmail(userData.email);
      res.send({ user });
    } catch (error) {
      res.status(500).send({ message: "Error fetching user data" });
    }
  }
);

export default router;
