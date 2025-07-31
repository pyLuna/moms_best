import { NextFunction, Request, Response } from "express";
import { findKey } from "../../service/key";
import { roles } from "../../service/rbac";
import { ServerPermissions } from "../../types/permissions";
import { compare } from "../../utils/hashing";
import { isSkip } from "../../utils/misc";

export const verifyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isSkip(req.path)) return next();

  const apiKeyHeader = req.headers["x-api-key"];
  const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

  console.log("API Key Header:", apiKeyHeader, apiKey);
  if (!apiKey) {
    return res.status(401).send({ error: "API key is missing" });
  }

  const record = await findKey(apiKey);

  if (!record) {
    return res.status(403).send({ error: "Invalid API key" });
  }

  const isValid = await compare(apiKey, record.key);

  if (!isValid) {
    return res.status(403).send({ error: "Invalid API key" });
  }

  (req as any).role = record.role;

  next();
};

export const authorize = (permission: ServerPermissions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleName = (req as any).role;
    const role = roles[roleName];
    if (!role || !role.permissions.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
