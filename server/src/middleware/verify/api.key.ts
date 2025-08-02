import { NextFunction, Request, Response } from "express";
import { decodeToken } from "src/utils/tokens";
import { getUserMetadata } from "../../service/metadata";
import { roles } from "../../service/rbac";
import { ServerPermissions } from "../../types/permissions";
import { isSkip } from "../../utils/misc";

export const verifyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isSkip(req.path)) return next();
  let code = 403;

  const token = req.cookies.token;

  if (!token) {
    res.status(401).send({ error: "Unauthorized: No token provided" });
    return;
  }

  const userData = decodeToken(token);
  if (!userData || !userData.user_id) {
    res.status(403).send({ error: "Invalid token" });
    return;
  }
  const user_id = userData.user_id;
  try {
    const record = await getUserMetadata(user_id);

    if (!record || !record?.key || user_id !== record!.user_id) {
      res.status(403).send({ error: "Invalid API key" });
      return;
    }
    (req as any).role = record.role;
    (req as any).apiKey = record.key;
  } catch (error) {
    console.error("Database error in verifyApiKey:", error);
    res.status(code).send({ error: error });
    return;
  }

  next();
};

export const authorize = (permission: ServerPermissions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleName = (req as any).role;

    if (!roleName) {
      res.status(403).json({ error: "Role not found in request" });
      return;
    }

    console.log("Role Name from request:", roleName);
    const role = roles[roleName];
    if (!role.permissions.includes(permission)) {
      res
        .status(403)
        .json({ error: "You don't have permission to access this resource" });
      return;
    } else {
      next();
    }
  };
};
