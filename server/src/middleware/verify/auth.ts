import { isSkip } from "../../utils/misc";
import { verifyToken } from "../../utils/tokens";

const verifyAuthorization = (req: any, res: any, next: any) => {
  const sendUnauthorized = () =>
    res.status(401).send({ error: "Unauthorized" });

  if (isSkip(req.path)) return next();

  const isVerified = verifyToken(req.cookies.token);
  if (!isVerified) return sendUnauthorized();

  next();
};

export { verifyAuthorization };
