import express from 'express'
const router = express.Router()
import {createMovie} from '../../controllers/movie-controller.js'
router.get('/test', function(req, res){
    res.json({ message: 'Welcome to the API!' })
})
router.post('/movie', createMovie)

export default router;

