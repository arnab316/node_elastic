import express from 'express';
import {Config} from './config/server-config.js'
import { elasticClient} from './config/elastic-config.js'
import apiRoutes from './routes/index.js';
import bodyParser from 'body-parser';
const startAndStop = async()=>{

    const app = express();
    const port = Config.PORT
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);


    //? Check if Elasticsearch is available or not
   /*await elasticClient.info().
   then(response => console.log(response))
   .catch(error => console.error(error)) */

   app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
   }) 
}

startAndStop();