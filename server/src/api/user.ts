import { Router } from "express";
import { authorize } from "../middleware/verify/api.key";
import { getUserMetadata } from "../service/metadata";
import { getUserByEmail } from "../service/user";
import Route from "../utils/route";
import { decodeToken } from "../utils/tokens";

const router = Router();

router.get(
  Route.user.get,
  authorize("read:users"), // Ensure the user has permission to read users
  async (req, res) => {
    const token = req.cookies.token;
    const userData = decodeToken(token)!;

    const user = await getUserByEmail(userData.email);
    const metadata = await getUserMetadata(user._id.toString());

    // delete api key from metadata
    delete metadata!["key"];

    console.log("User Metadata:", metadata);
    res.send({ user, metadata });
    return;
  }
);

export default router;
