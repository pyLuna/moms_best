import Route from "./route";

const skippablePaths = [Route.auth.login.email, Route.auth.signup.email];

// Helper to wrap async middleware
export const wrapAsync = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const isSkip = (path: string) => {
  return skippablePaths.some((p) => path.includes(p));
};
