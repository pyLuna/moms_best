import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
    const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET as string, { expiresIn: "1d" });
    return token;
}

export { generateToken };