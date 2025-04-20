import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
    const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET as string, { expiresIn: "1h" });
    return token;
}

export { generateToken };