import { isSkip } from "../../utils/misc";
import { verifyToken } from "../../utils/tokens";

const verifyAuthorization = (req: any, res: any, next: any) => {
  const sendUnauthorized = () =>
    res.status(401).send({ error: "Unauthorized" });

  const isSkippable = isSkip(req.path);
  if (isSkippable) return next();

  const isVerified = verifyToken(req.cookies.token);
  if (!isVerified) sendUnauthorized();

  next();
};

export { verifyAuthorization };
