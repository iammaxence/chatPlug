import models from '../../application/db/setup/initModels';
import { User } from "../../domains/User";
const { userModel } = models;

const getUser = async (id: number) => {
  const user = await userModel.findOne({ where : { id } });
  if(!user) throw new Error(`Bad request exception : User ${id} doesnt exists`);

  return new User(id, user.email, user.pseudo)
}

const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ where : { email } });
  if(!user) throw new Error(`Bad request exception : User ${email} doesnt exists`);

  return new User(user.id, email, user.pseudo)
}

const userExists = (email: String) => {
  return userModel.count({ where: {email}  });
}

export = {
  getUser,
  getUserByEmail,
  userExists,
}