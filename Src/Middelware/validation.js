const dataMethods =['body','query','headers','params',]

const validation = (Schema)=>{
    return (req,res,next)=>{
        const validationArrey =[] 
        dataMethods.forEach((key)=>{
        if(Schema[key]){
            const validationResult = Schema[key].validate(req[key],{abortEarly:false})
            if(validationResult.error){
                validationArrey.push(validationResult.error.details)
            }
        }
        })
        if(validationArrey.length > 0){
            return res.status(400).json({message:"validationError", validationArrey})
        }
            next()
        
    }
}

export default validation


// ===================== الطريقه الثانيه ==================
/*export const validation = (Schema)=>{
    return (req,res,next)=>{
        const validationArrey =[] 
        if(Schema.body){
            const validationBody = Schema.body.validate(req.body,{abortEarly:false});
            if(validationBody.error){
                validationArrey.push(validationBody.error.details)
            } 
        }

        if(Schema.query){
            const validationQuery = Schema.query.validate(req.query,{abortEarly:false});
            if(validationQuery.error){
                validationArrey.push(validationQuery.error.details)
            }
        }

        if(Schema.params){
            const validationParams = Schema.params.validate(req.params,{abortEarly:false});
            if(validationParams.error){
                validationArrey.push(validationParams.error.details)
            }
        }

        if(Schema.headers){
            const validationHeaders = Schema.headers.validate(req.headers,{abortEarly:false});
            if(validationHeaders.error){
                validationArrey.push(validationHeaders.error.details)
            }
        }

        if(validationArrey.length>0){
        return res.status(400).json({message:"validationError", validationArrey})
        }
        next()
        
        
    }
}*/






// ==================== الطريقه الاولى  ===================== 
    /*export const validation = (Schema)=>{
        return (req,res,next)=>{

            const validationResult = Schema.validate(req.body,{abortEarly:false});
            if(validationResult.error){
                return res.status(400).json({message: validationResult.error.details})
        
            } 
            next()
            
            
        }
    }*/
    
    
    