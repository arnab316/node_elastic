import express from 'express';
import {Config} from './config/server-config.js'
import { elasticClient} from './config/elastic-config.js'
const startAndStop = async()=>{

    const app = express();
    const port = Config.PORT

   await elasticClient.info().
   then(response => console.log(response))
   .catch(error => console.error(error))
   app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
   }) 
}

startAndStop();