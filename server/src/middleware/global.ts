import { isTokenExpired } from "@/utils/tokens";

const verifyAuthorization = (req: any, res: any, next: any) => {
  const sendUnauthorized = () =>
    res.status(401).send({ message: "Unauthorized" });

  if (req.path === "/auth/email" || req.path === "/auth/signup/email")
    return next();

  const token = req.cookies.token;
  console.log("Token from request:", token);
  if (!token) return sendUnauthorized(); // if there isn't a token, send an error message

  const isExpired = isTokenExpired(token);

  console.log("isExpired", isExpired);
  // TODO: redirect user to log in
  if (isExpired) return sendUnauthorized();
  console.log("Authorized");
  next();
};

export { verifyAuthorization };
