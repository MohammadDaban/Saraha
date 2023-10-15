import joi from "joi";

export const signupSchema ={
    
    
    body :joi.object({
        
        userName:joi.string().alphanum().required(),
        email:joi.string().required(),
        gender:joi.string().valid('Male','Female'),
        age:joi.number().integer().min(18).max(50).required().messages({
            'any.required':'Please enter your age'
        }),
        password:joi.string().required(),
        cpassword:joi.string().valid(joi.ref('password')).required()
    }),
    
};


// ============== Sign 'In =============================

export const signinSchema = {
    body:joi.object({
    
            email:joi.string().email().required(),
            password:joi.string().required().messages({
                'any.required':"Please enter your password"
            })
        }
    ) 
}

