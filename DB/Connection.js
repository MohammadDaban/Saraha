import mongoose from "mongoose";

const connectDB = async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log(`connect DB `);
    })
    .catch((err)=>{
        console.log(`error connecting DB : ${err}`);
    });
}


export default connectDB