import { NextFunction, Request, Response } from "express";
import { findKey } from "../../service/metadata";
import { roles } from "../../service/rbac";
import { ServerPermissions } from "../../types/permissions";
import { isSkip } from "../../utils/misc";
import { decodeToken } from "../../utils/tokens";

export const verifyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isSkip(req.path)) return next();

  const apiKeyHeader = req.headers["x-api-key"];
  const token = decodeToken(req.cookies.token);

  if (!apiKeyHeader) {
    res.status(401).send({ error: "API key is missing" });
    return;
  }

  const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

  if (!apiKey) {
    res.status(401).send({ error: "API key is missing" });
    return;
  }

  try {
    const record = await findKey(apiKey);

    if (!record) {
      res.status(403).send({ error: "Invalid API key" });
      return;
    }

    const isValid = apiKey === record!.key;

    if (!isValid) {
      res.status(403).send({ error: "Invalid API key" });
      return;
    }
  } catch (error) {
    console.error("Database error in verifyApiKey:", error);
    res.status(500).send({ error: "Database connection error" });
    return;
  }

  // at this point token should be valid
  (req as any).role = token.role;

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
