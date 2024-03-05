import mongoose from "mongoose";
async function ulanish (){
    try {
        mongoose.set('strictQuery',false)

        await mongoose.connect("mongodb+srv://jamshid14092002:3tGLCosvg3eKCyX8@cluster0.miks1ok.mongodb.net/?retryWrites=true&w=majority", {});
            console.log(`ulanish bajarildi`)
    } catch (error) {
        console.log("Mongodbda ulanishda xatolik mavjud", error)
    }
};
ulanish()