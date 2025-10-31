import { GraphQLID,GraphQLString,GraphQLObjectType, GraphQLBoolean, GraphQLList } from "graphql";
import { userType } from "../../user/post-typequery";
export const postType=new GraphQLObjectType({
           name:"post",
           fields:{
               _id:{type:GraphQLID},
               content:{type:GraphQLString},
               createdAt:{type:GraphQLString},
               updatedAt:{type:GraphQLString},
               userid:{type: userType},
           }
       })

       export const postresponse=new GraphQLObjectType({
                  name:"getpost",
                  fields:{
                      message:{type:GraphQLString},
                      success:{type:GraphQLBoolean},
                      data:{type:postType}
                  }
              })

      export const postlistresponse=new GraphQLObjectType({
                  name:"getposts",
                  fields:{
                      message:{type:GraphQLString},
                      success:{type:GraphQLBoolean},
                      data:{type:new GraphQLList(postType)}
                  }
              })
                        