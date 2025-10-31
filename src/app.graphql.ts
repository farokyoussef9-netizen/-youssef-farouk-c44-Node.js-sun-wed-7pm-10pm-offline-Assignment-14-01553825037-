import {  GraphQLObjectType,GraphQLSchema } from "graphql";
import { postQuery} from "./module/post/graphql/postquery"
let query=new GraphQLObjectType({
    name:"rootQuery",
    fields:{
        ...postQuery
    }
})
export const schema=new GraphQLSchema({query})