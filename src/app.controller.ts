    import { type Express } from "express";
    import {authRouter,userRouter,postRouter,commentRouter} from "./module"
    import { connectDB } from "./DB";
    import { AppError } from "./utils";
    import { NextFunction, Request, Response } from "express";
    import cors from "cors";
    import { createHandler } from "graphql-http/lib/use/express";
    import { schema } from "./app.graphql";
    import { GraphQLError } from "graphql";
    export function bootstrap(app:Express,express:any){
        app.use(express.json())
        app.use(cors({origin:"*"}))
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/post",postRouter);
    app.use("/comment",commentRouter);
    
    app.all("/graphql",createHandler({schema,formatError:(error:GraphQLError)=>{//global error handler for graphql
        return {
            message:error.message,
            success:false,
            path:error.path,
            extensions:error.originalError,
        }as unknown as GraphQLError
    },context:(req)=>{
        const token=req.headers["authorization"];
        return{
            token
        } 
    }}))
        app.use("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false});
        })

        connectDB();
        app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
            return res.status(error.statusCode||500).json({message:error.message,success:false,errorDetails:error.errorDetails});
        })
    }