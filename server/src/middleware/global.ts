import { isTokenExpired } from "@/utils/tokens";

const verifyAuthorization = (req: any, res: any, next: any) => {
  const sendUnauthorized = () =>
    res.status(401).send({ message: "Unauthorized" });

  if (req.path === "/auth/email" || req.path === "/auth/signup") return next();
  const { authorization } = req.headers;

  if (!authorization) return sendUnauthorized(); // if there isn't a cookie, send an error message

  const token = authorization.split(" ")[1];

  if (!token) return sendUnauthorized(); // if there isn't a token, send an error message

  const isExpired = isTokenExpired(token);

  console.log("isExpired", isExpired);
  // TODO: redirect user to log in
  if (isExpired) return sendUnauthorized();
  console.log("Authorized");
  next();
};

export { verifyAuthorization };
