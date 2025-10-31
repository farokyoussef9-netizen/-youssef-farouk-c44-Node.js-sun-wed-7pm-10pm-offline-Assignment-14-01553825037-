import { GraphQLID,GraphQLString,GraphQLObjectType } from "graphql";

export const userType=new GraphQLObjectType({
                   name:"user",
                   fields:{
                       _id:{type:GraphQLID},
                       fullname:{type:GraphQLString},
                       email:{type:GraphQLString},
                       createdAt:{type:GraphQLString},
                       updatedAt:{type:GraphQLString},
                   }
               })