"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const postquery_1 = require("./module/post/graphql/postquery");
let query = new graphql_1.GraphQLObjectType({
    name: "rootQuery",
    fields: {
        ...postquery_1.postQuery
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query });
