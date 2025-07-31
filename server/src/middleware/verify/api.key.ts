import { NextFunction, Request, Response } from "express";
import { findKey } from "../../service/metadata";
import { roles } from "../../service/rbac";
import { ServerPermissions } from "../../types/permissions";
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
    res.status(401).send({ error: "API key is missing" });
    return;
  }

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

  next();
};

export const authorize = (permission: ServerPermissions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleName = (req as any).role;
    const role = roles[roleName];
    if (!role || !role.permissions.includes(permission)) {
      res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
