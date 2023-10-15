import userModel from "../../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import sendEmail from "../../../Services/sendEmail.js";



export const signup = async (req, res,next) =>{


    const {userName,email,password,gender,age}=req.body;

    const user = await userModel.findOne({email})
    if(user){
        return res.status(409).json({message:"email  exists"})
    }
    const hashpassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND))

    const creatUser = await userModel.create({userName,email,password:hashpassword,gender,age})

    const token = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:'1h'})
    const refreshToken = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:'1d'})
    const link = `http://localhost:3500/auth/confirmEmail/${token}`;
    const refreshlink = `http://localhost:3500/auth/newconfirmEmail/${refreshToken}`
    const html = `<a href=${link}> verify email </a> <br /><br /> <a href=${refreshlink}> request new email to verify your email </a> ` ;
    sendEmail(email,"confirm email",html)

    return res.status(201).json({message:'success',user:creatUser._id})
}



// ================ Sign In =============================

export const  signIn = async (req, res) => {
    
   
    const {email,password}=req.body
    
    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(404).json({message: "Data In Valid email"})
    }
    
    const match = bcrypt.compareSync(password,user.password)
    if(!match){
        return res.status(404).json({message: "Data In Valid password"})
    }
    if(!user.confirmEmail){
        return res.status(404).json({message: "please confirm your email"})
    }
    const token = jwt.sign({id:user._id},process.env.LOGINSIGNATURE)
    return res.status(200).json({message:'success',token})

}


// ============= Confirme Email ===========================
export const confirmEmail = async (req,res,next) => {
    const {token}= req.params
    const decoded = jwt.verify(token,process.env.EMAILTOKEN);

    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true});
    if(!user){
        return res.status(201).json({message:'your email is verified'})
    }
    return res.redirect(process.env.FRONTEND_LOGIN)
}



// ================ New Confirm Email ===================

export const newConfirmEmail = async (req,res,next) => {
    const{refreshToken}=req.params
    const decoded =jwt.verify(refreshToken,process.env.EMAILTOKEN);
    const token = jwt.sign({email:decoded.email},process.env.EMAILTOKEN,{expiresIn:'1h'});
    const link = `http://localhost:3500/auth/confirmEmail/${token}`;
    const html = `<a href='${link}'> verify email</a>`;
    sendEmail(decoded.email,"confirmEmail",html)
    return res.status(201).json({message:"new email is sent successfully"})
}