import axios from "axios";
import { User } from "../../components/domain/user/User";

/** get user in database */
const getUser = async (id: number) => {
 
const userResponse = await axios.get<{id: number, name: string, pseudo: string}>("http://localhost:8090/user/getUser?id="+id);

const {id: idUser, name, pseudo} = userResponse.data;

return new User(idUser, name, pseudo);
}


const getUserByEmail = async (email: string) => {
  const userResponse = await axios.get<{id: number, name: string, pseudo: string}>("http://localhost:8090/user/get-user-by-email?email="+email);
  
  const {id: idUser, name, pseudo} = userResponse.data;
  
  return new User(idUser, name, pseudo);
}

/** Create user in database */

const createUser = async (userPayload: {email: String, pseudo: String}) => {
  const { email, pseudo } = userPayload;
  const payload = {
    email,
    pseudo,
  }
  const userResponse = await axios.post<{id: number, name: string, pseudo: string}>("http://localhost:8090/user/create-user", payload);
  
  //add presenter
  return userResponse;
  }

/** user exists */

const exists = async (email: String) => {

  const {data: isUserAlreadyExists} = await axios.get<boolean>("http://localhost:8090/user/user-exists?email="+email);

  //add presenter
  return isUserAlreadyExists;
}

const services = {
  getUser,
  getUserByEmail,
  createUser,
  exists,
};

export default services;