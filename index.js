import mongoose from "mongoose";
import express, { urlencoded } from "express";
import cors from "cors";
import upload from "./module/upload.js";
import multer from "multer";
import File from "./module/file.js"
import fs from "fs";
import  Jwt  from "jsonwebtoken";
import tokencheck from "./token/index.js";
import * as dotenv from "dotenv" ;
dotenv.config();

// import joi from "jo"

multer({dest:"static/img"});
try {
    mongoose.set('strictQuery',false)
    await mongoose.connect("mongodb://localhost/fayllar")
    // await mongoose.connect("mongodb+srv://jamshid14092002:3tGLCosvg3eKCyX8@cluster0.miks1ok.mongodb.net/?retryWrites=true&w=majority", {});
        console.log(`ulanish bajarildi`)
} catch (error) {
    console.log("Mongodbda ulanishda xatolik mavjud", error)
}
const app = express();
app.use(urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use(express.static("static/"));
app.post("/",[tokencheck,upload.single("fayl")],async (req, res)=>{
    console.log(req.body.filename)
    const {url, name} = req.body.filename;
    let file = new File({
        name:name,
        url:url
    });
    await file.save()
    res.status(200).send({salom:1});
});


app.get("/files",tokencheck, async (req, res)=>{
    let data = await File.find();
    res.status(200).send(data)
})

app.delete("/delete/:url",tokencheck,async (req,res)=>{
    await File.findOneAndDelete({url:req.params.url})
    fs.unlink(`${process.cwd()}/static/img/${req.params.url}`,(err)=>{
        if(err){
            return console.log("Xatolik mavjud")
        }
        console.log("Mavjud fayl o'chirildi")
    })
    res.status(200).send(req.params)
})

app.post("/login",(req, res)=>{
    const {login, password} = {
        login:"Jamshid",
        password:"feylon1409"
    };
    console.log(req.ip)
    const {login1, password1} = req.body;
    if(!(login == login1 && password == password1))
    return res.status(400).send("Parol xato");

    const token = Jwt.sign({login:login},"allaqanday yopiq parol",{expiresIn:"1h"});
    return res.header("-x-token", token).status(200).send({login:true,token:token});       

})

    

app.listen(process.env.PORT,()=>{
console.log("Hammasi joyida");
console.log("delete/url method delete");
console.log("/login"," login1 password1");;
console.log("-x-token, fayll")
});
