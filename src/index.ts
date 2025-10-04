import {log} from "console"
import express from "express";
import {config} from "dotenv"
config()
import { bootstrap } from "./app.controller";
 const app=express();
 const port=process.env.PORT;
 bootstrap(app,express);
 app.listen(port,()=>{
    log("server is running on port",port)
 })