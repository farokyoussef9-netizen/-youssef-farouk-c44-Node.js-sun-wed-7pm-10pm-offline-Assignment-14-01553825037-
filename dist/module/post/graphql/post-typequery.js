"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postlistresponse = exports.postresponse = exports.postType = void 0;
const graphql_1 = require("graphql");
const post_typequery_1 = require("../../user/post-typequery");
exports.postType = new graphql_1.GraphQLObjectType({
    name: "post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        userid: { type: post_typequery_1.userType },
    }
});
exports.postresponse = new graphql_1.GraphQLObjectType({
    name: "getpost",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.postType }
    }
});
exports.postlistresponse = new graphql_1.GraphQLObjectType({
    name: "getposts",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.postType) }
    }
});
