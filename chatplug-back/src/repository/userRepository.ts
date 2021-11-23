import models from '../db/setup/initModels';
import { User } from "../domain/User";
const { userModel } = models;

const getUser = async (id: number) => {
  const user = await userModel.findOne({ where : { id } });
  if(!user) throw new Error(`Bad request exception : User ${id} doesnt exists`);
  return new User(id, user.email, user.pseudo)
}

export = {
  getUser,
}