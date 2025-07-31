import { compare as bcryptCompare, hash } from "bcrypt";
import { randomBytes } from "crypto";
const encrypt = async (text: string) => {
  return await hash(text, 10);
};

const compare = async (text: string, hash: string) => {
  return await bcryptCompare(text, hash);
};

const generateApiKey = async (): Promise<string> => {
  return randomBytes(32).toString("hex");
};

export { compare, encrypt, generateApiKey };
