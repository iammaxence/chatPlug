import models from '../../application/db/setup/initModels';
import { User } from "../../domains/User";
const { userModel } = models;

const getUser = async (id: number) => {
  const user = await userModel.findOne({ where : { id } });
  if(!user) throw new Error(`Bad request exception : User ${id} doesnt exists`);
  return new User(id, user.email, user.pseudo)
}

const userExists = (email: String) => {
  return userModel.count({ where: {email}  });
}

export = {
  getUser,
  userExists,
}