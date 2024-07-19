import express from 'express'
import {getWeather,addToFav , getFavsWeather,removeFromFav} from '../controllers/weatherController.js'

const router = express.Router()

router.post('/get', getWeather);
router.post('/add-to-fav', addToFav);
router.get('/get-fav',getFavsWeather)
router.delete('/remove-from-fav', removeFromFav);


export default router