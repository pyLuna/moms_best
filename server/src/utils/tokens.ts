import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
    const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET as string, { expiresIn: "10s" });
    return token;
}

const verifyToken = (token: string) => jwt.verify(token, process.env.TOKEN_SECRET as string);

const isTokenExpired = (token: string) => {
    try {
        const decoded = verifyToken(token)! as jwt.JwtPayload;
        console.log("decoded", decoded);
        return decoded.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
        return true;
    }
};
export {
    generateToken,
    verifyToken,
    isTokenExpired
};