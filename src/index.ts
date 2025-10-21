import {log} from "console"
import express from "express";
import {config} from "dotenv"
config()
import { bootstrap } from "./app.controller";
import { initsocket } from "./socket-io";
import {Server} from "socket.io";

 const app=express();
 const port=process.env.PORT;
 bootstrap(app,express);
 const server=app.listen(port,()=>{
    log("server is running on port",port)
 })
initsocket(server);
