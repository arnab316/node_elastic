import express from 'express';
import {Config} from './config/server-config.js'
import {checkConnections} from './config/elastic-config.js'
const startAndStop = async()=>{

    const app = express();
    const port = Config.PORT

   await checkConnections();  
   app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
   }) 
}

startAndStop();