import Jwt from "jsonwebtoken";

export default function(req,res,next){
try{
let token = req.header("-x-token")    
let decoded = Jwt.verify(token,"allaqanday yopiq parol");
console.log(decoded);
next();
}
catch(err){
return res.status(400).send("Token eskirgan");
}


}