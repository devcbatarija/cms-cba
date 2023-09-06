const express=require("express");
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const cors=require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/index.js"); //importamos rutas


const server=express(); //importamos server
server.disable("x-powered-by"); //eliminar el express service

server.name="CBA"; //nombre api


server.use(morgan("dev"));
server.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
server.use(bodyParser.json({limit:"50mb"}));
server.use(cookieParser());
server.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:5173");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Headers","Origin,X-Request-With, Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    //res.header("Creator","");
    const now=new Date();  
    res.header("Server-Time",now);
    next();
})


server.use("/api",router); //rutas
//http://localhost:3001/api/
server.use(cors({
    origin: 'http://localhost:5173/', // reemplaza esto con el origen de tu frontend
    credentials: true
})); 
server.use((err,req,res,next)=>{
    const status=err.stats || 500;
    const message=err.message || err;
    console.log(err)
    res.status(status).send(message);
})

module.exports=server;