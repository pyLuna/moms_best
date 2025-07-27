import jwt from "jsonwebtoken";

const generateToken = (data: Record<string, any>) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

const decodeToken = (token: string) =>
  jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload;

const isTokenExpired = (token: string) => {
  try {
    const decoded = decodeToken(token)!;
    console.log("decoded", decoded);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : false;
  } catch (err) {
    return true;
  }
};
export { decodeToken, generateToken, isTokenExpired };
