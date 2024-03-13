import md5 from "md5";
import multer from "multer"


let stroge = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null,`${process.cwd()}/static/img`);
    },
    filename:(req, file, cb)=>{
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        let name = md5(Date.now())
        cb(null,`${name}.` + ext);
        req.body.filename ={url:`${name}.` + ext, name:file.originalname};;
        console.log("Bajarildi")
    }
});

let upload = multer({
    fileFilter:(req,file,cb)=>{
        cb(null,true);    
    },
    storage:stroge
});
export default upload;