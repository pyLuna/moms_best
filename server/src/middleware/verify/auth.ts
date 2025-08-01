import { isSkip } from "../../utils/misc";
import { verifyToken } from "../../utils/tokens";

const verifyAuthorization = (req: any, res: any, next: any) => {
  const sendUnauthorized = () =>
    res.status(401).send({ error: "Please log in." });

  const isSkippable = isSkip(req.path);
  if (isSkippable) return next();

  console.log("Authorization Middleware: Checking token...", req.cookies.token);
  const isVerified = verifyToken(req.cookies.token);
  if (!isVerified) sendUnauthorized();

  next();
};

export { verifyAuthorization };
