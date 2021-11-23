import axios from "axios";
import { User } from "../domain/user/User";

/** Register user in database */
const getUser = async (id: number) => {
 
const userResponse = await axios.get<{id: number, name: string, pseudo: string}>("http://localhost:8090/user/getUser?id="+id);

const {id: idUser, name, pseudo} = userResponse.data;

return new User(idUser, name, pseudo);
}

const services = {
  getUser,
};

export default services;