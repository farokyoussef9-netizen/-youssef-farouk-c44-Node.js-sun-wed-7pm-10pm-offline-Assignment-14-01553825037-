import { GraphQLID,GraphQLString,GraphQLObjectType,GraphQLBoolean } from "graphql"
import {PostRebository} from "../../../model/Post/Post.Rebository"
import { postType } from "./post-typequery"
import {getsbasificpost} from "./post-service.graphql"
import { postresponse,postlistresponse } from "./post-typequery"

export const postQuery={
    getpost:{
       type: postresponse,
args:{
    _id:{type:GraphQLID}
},
resolve: getsbasificpost
    },
    getallposts:{
        type: postlistresponse,
        
        resolve: getsbasificpost
    }
}