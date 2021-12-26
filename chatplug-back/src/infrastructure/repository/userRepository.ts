import models from '../../application/db/setup/initModels';
import { User } from "../../domains/User";
import { UserUseCaseDto } from '../../domains/user/dto/UserUseCaseDto';
const { userModel } = models;

const getUser = async (id: number) => {
  const user = await userModel.findOne({ where : { id } });
  return UserUseCaseDto.toDto(user);
}

const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ where : { email } });
  if(!user) throw new Error(`Bad request exception : User ${email} doesnt exists`);

  return new User(user.id, email, user.pseudo)
}

const userExists = (email: String) => {
  return userModel.count({ where: {email}  });
}

const createUser = async (email: string, pseudo: string, status='PENDING'): Promise<UserUseCaseDto> => {
  const createdUser:{ id: number, pseudo: string, status: string } = await userModel.create({ email, pseudo, status });
  return UserUseCaseDto.toDto(createdUser);
}

export = {
  getUser,
  getUserByEmail,
  userExists,
  createUser,
}