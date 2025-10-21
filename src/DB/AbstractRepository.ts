import { Model } from "mongoose";
import { RootFilterQuery,ProjectionType,QueryOptions,UpdateQuery,MongooseUpdateQueryOptions } from "mongoose";
import { Document } from "mongoose";
//عملنها عشان لو غيرنا الداتا بيز نغير method هنا بس
export default abstract class AbstractRepository<T>{
    constructor(protected model:Model<T>){
    }
    async create(item:Partial<T>){
        //prebare data
        const doc= new this.model(item);
        return await doc.save() as Document<T>;
    }
    async getone(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,option?:QueryOptions<T>){
    return await this.model.findOne(filter,projection,option)
    }
    async exist(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,option?:QueryOptions<T>){
        return await this.model.findOne(filter,projection,option)
        }
    
    async update(filter: RootFilterQuery<T>,update:QueryOptions<T>,option?:MongooseUpdateQueryOptions<T>){
return await this.model.updateOne(filter,update,option)
    }
    async delete(filter:RootFilterQuery<T>){
return await this.model.deleteOne(filter)
    }
}
