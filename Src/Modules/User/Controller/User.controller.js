import userModel from "../../../../DB/Models/User.model.js";

export const profile = async (req,res) => {
    // const user = await userModel.findById(req.user);
    return res.json({message:req.user})
};