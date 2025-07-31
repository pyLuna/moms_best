import Route from "./route";

// Helper to wrap async middleware
export const wrapAsync = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const isSkip = (path:string) => {
  return path === Route.auth.login.email || path === Route.auth.signup.email;
}