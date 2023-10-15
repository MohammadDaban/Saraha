import mongoose, { Schema,model } from "mongoose";

const UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    age :Number,
    confirmEmail:{
        type:Boolean,
        default: false,
    },
    gender:{
        type: String,
        default: 'Male',
        enum:['Male','Female'],
    },
    age: Number
    

},{
timestamps:true
})


const userModel = mongoose.model.User||model('User',UserSchema)

export default userModel