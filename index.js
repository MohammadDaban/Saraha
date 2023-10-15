import initApp from './Src/App.router.js';
import  dotenv from 'dotenv'

import express from 'express';
dotenv.config()
const app = express();
const PORT = process.env.PORT||3500;

initApp(app,express);



app.listen(PORT,()=>{
    console.log(`server is runneng..... , port ${PORT}`);
});