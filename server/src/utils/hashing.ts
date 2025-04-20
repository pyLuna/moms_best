import { hash, compare as bcryptCompare } from "bcrypt";
const encrypt = async (text: string) => {
    return await hash(text, 10);
}

const compare = async (text: string, hash: string) => {
    return await bcryptCompare(text, hash);
}

export { encrypt, compare }