import axios from "axios";
import { User } from "../../components/domain/user/User";

/** get user in database */
const getUser = async (id: number) => {
 
const userResponse = await axios.get<{id: number, pseudo: string, status: string}>("http://localhost:8090/user/getUser?id="+id);

const {id: idUser, pseudo, status} = userResponse.data;

return new User(idUser, pseudo, status);
}


const getUserByEmail = async (email: string) => {
  const userResponse = await axios.get<{id: number, pseudo: string, status: string}>("http://localhost:8090/user/get-user-by-email?email="+email);
  
    if(userResponse && userResponse.data) {
      const {id: idUser, pseudo, status} = userResponse.data;
  
      return new User(idUser, pseudo, status);
    }
  return null;
}

/** Create user in database */

const createUser = async (userPayload: {email: String, pseudo: String}) => {

  const payload = {
    email: userPayload.email,
    pseudo: userPayload.pseudo,
  }
  const userResponse = await axios.post<{id: number, pseudo: string, status: string}>("http://localhost:8090/user/create-user", payload);
  
  const {id: idUser, pseudo, status} = userResponse.data;
  
  return new User(idUser, pseudo, status);
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