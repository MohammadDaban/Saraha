import MessageRouter from './Modules/Message/Message.router.js'
import AuthRouter from './Modules/Auth/Auth.router.js'
import connectDB from '../DB/Connection.js';
import userRouter from './Modules/User/User.router.js'
import cors  from 'cors'
const initApp = (app,express) =>{
    app.use(express.json());
    
    connectDB()
    app.use(cors())
    app.use('/messages',MessageRouter)
    app.use('/Auth',AuthRouter)
    app.use('/user',userRouter)
    app.use('*',(req,res)=>{
        return res.status(404).json ({message:'Page Not Found '})
    })
}

export default initApp