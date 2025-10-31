"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const graphql_1 = require("graphql");
const post_service_graphql_1 = require("./post-service.graphql");
const post_typequery_1 = require("./post-typequery");
exports.postQuery = {
    getpost: {
        type: post_typequery_1.postresponse,
        args: {
            _id: { type: graphql_1.GraphQLID }
        },
        resolve: post_service_graphql_1.getsbasificpost
    },
    getallposts: {
        type: post_typequery_1.postlistresponse,
        resolve: post_service_graphql_1.getsbasificpost
    }
};
