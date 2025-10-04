import AbstractRepository from "../../DB/AbstractRepository";
import { IPost } from "../../utils/common/iterfaces";
import { Post } from "./post.model";

export class PostRebository extends AbstractRepository<IPost>{
    constructor(){
        super(Post)
    }
}