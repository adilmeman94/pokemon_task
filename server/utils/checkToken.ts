import bcrypt from "bcryptjs";

const checkToken = async (password: string) => {
  return await bcrypt.compare(password, password);
};

export default checkToken;
