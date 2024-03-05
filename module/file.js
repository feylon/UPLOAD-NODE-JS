import mongoose from "mongoose";
(async()=>{
    await mongoose.connect("mongodb://localhost/fayllar");
})()
const File = mongoose.model("fayl", new mongoose.Schema({
    url:String,
    name:String,
    
},
));

(async ()=>{
    let file = new File({
        name:"Paint",
        url:"hbsdjdsbchdbhsbcjd"
    });
await file.save();    
})
export default File;