import { compare as bcryptCompare, hash } from "bcrypt";
import { randomBytes } from "crypto";
const encrypt = async (text: string) => {
  return await hash(text, 10);
};

const compare = async (text: string, hash: string) => {
  return await bcryptCompare(text, hash);
};

const generateApiKey = async (): Promise<string> => {
  const key = randomBytes(32).toString("hex");
  return await hash(key, 10);
};

export { compare, encrypt, generateApiKey };
