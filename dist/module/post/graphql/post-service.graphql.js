"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallpost = exports.getsbasificpost = void 0;
const model_1 = require("../../../model");
const auth_graphql_1 = require("../../../middleware/auth-graphql");
const validation_middleware_graphql_1 = require("../../../middleware/validation-middleware-graphql");
const post_schema_1 = require("./post-schema");
const getsbasificpost = async (_, args, context) => {
    //imblment auth 
    //graphql مفيهوش middleware 
    await (0, auth_graphql_1.isAuthenticatedgraohql)(context);
    //implment validation
    (0, validation_middleware_graphql_1.isvalid)(post_schema_1.postSchema, args);
    const postrepo = new model_1.PostRebository();
    const post = await postrepo.getone({ _id: args._id }, {}, { populate: [{ path: "userid" }] });
    //لومعملناش await Post ={} مش null
    if (!post) {
        throw new Error("post not found");
    }
    return {
        message: "done",
        success: true,
        data: post
    };
};
exports.getsbasificpost = getsbasificpost;
const getallpost = async (_, args) => {
    const postrepo = new model_1.PostRebository();
    const post = await postrepo.getall({}, {}, { populate: [{ path: "userid" }] });
    //لومعملناش await Post ={} مش null
    if (!post) {
        throw new Error("post not found");
    }
    return {
        message: "done",
        success: true,
        data: post
    };
};
exports.getallpost = getallpost;
