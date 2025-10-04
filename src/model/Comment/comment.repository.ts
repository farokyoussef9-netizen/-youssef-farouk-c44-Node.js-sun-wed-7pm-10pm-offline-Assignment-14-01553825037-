import AbstractRepository from "../../DB/AbstractRepository";
import { Comment } from "./comment.model";
import { IComment } from "../../utils/common/iterfaces";


export class CommentRepository extends AbstractRepository<IComment>{
    constructor(){
        super(Comment)
    }
}