import models from '../../application/db/setup/initModels';
import { User } from "../../domains/User";
import { UserUseCaseDto } from '../../domains/user/dto/UserUseCaseDto';
const { userModel } = models;

export class UserRepository {

  public async getUser (id: number): Promise<User|null> {
    const user = await userModel.findOne({ where : { id } });
    return UserUseCaseDto.toDto(user);
  }
  
  public async getUserByEmail(email: string): Promise<User|null> {
    const user:{id: number, pseudo: string, status: string} = await userModel.findOne({ where : { email } });
    return UserUseCaseDto.toDto(user);
  }
  
  public async userExistsByEmail(email: String): Promise<boolean> {
    const doesUserExists =  await userModel.count({ where: {email}  });
    return !!doesUserExists;
  }

  public async userExistsById(id: number): Promise<boolean> {
    const doesUserExists =  await userModel.count({ where: {id}  });
    return !!doesUserExists;
  }
  
  public async createUser(email: string, pseudo: string, status='PENDING'): Promise<User|null> {
    const createdUser:{ id: number, pseudo: string, status: string } = await userModel.create({ email, pseudo, status });
    return UserUseCaseDto.toDto(createdUser);
  }

}