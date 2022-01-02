import models from '../../application/db/setup/initModels';
import { User } from "../../domains/User";
import { UserUseCaseDto } from '../../domains/user/dto/UserUseCaseDto';
const { userModel } = models;

const getUser = async (id: number): Promise<User> => {
  const user = await userModel.findOne({ where : { id } });
  return UserUseCaseDto.toDto(user);
}

const getUserByEmail = async (email: string): Promise<User> => {
  console.log('email : ', email);
  const user:{id: number, pseudo: string, status: string} = await userModel.findOne({ where : { email } });
  console.log('user by email : ', user);
  return UserUseCaseDto.toDto(user);
}

const userExists = async (email: String): Promise<boolean> => {
  const doesUserExists =  await userModel.count({ where: {email}  });
  return !!doesUserExists;
}

const createUser = async (email: string, pseudo: string, status='PENDING'): Promise<User> => {
  const createdUser:{ id: number, pseudo: string, status: string } = await userModel.create({ email, pseudo, status });
  return UserUseCaseDto.toDto(createdUser);
}

export = {
  getUser,
  getUserByEmail,
  userExists,
  createUser,
}