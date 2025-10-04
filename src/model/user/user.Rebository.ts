import { User } from "./user.model"
import AbstractRepository from "../../DB/AbstractRepository";
import { IUser } from "../../utils/common/iterfaces";

export  class UserRebository extends AbstractRepository  <IUser>{
    constructor(){
        super(User);
    }
    GetAllUsers(){
        return this.model.find();
    }

}
