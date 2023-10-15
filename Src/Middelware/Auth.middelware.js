
import jwt from 'jsonwebtoken'
import userModel from '../../DB/Models/User.model.js';


export const auth = async (req, res, next) => {

    const {authorization} = req.headers
    if(!authorization?.startsWith(process.env.BERARKEY))
    {
        return res.json({message:'Invalid Authorization'})
    }
    const token =  authorization.split(process.env.BERARKEY)[1]
    if(!token){
        return res.json({message:'Invalid Token'})
    }
    const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);

    const authUser = await userModel.findById(decoded.id).select('userName email')
    if(!authUser){
        return res.json({message:'Not Register Account'});
    }
    req.user = authUser
    next()
    


};
