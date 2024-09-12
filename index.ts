import mongoose from 'mongoose'
import express from 'express'
import {Request, Response} from 'express'
import { createMovie, deleteMovie, getMovies, getMovieById,
  updateMovie,  } from './controllers/movieController'
import { signup, login } from './controllers/userController'
import secureRoute from './middleware/secureRoute'

const app = express()

const router = express.Router()

router.route('/api/signup').post(signup)
router.route('/api/login').post(login)
router.route('/api/movies').get(getMovies)               
router.route('/api/movies/:movieId').get(getMovieById)   

router.route('/api/movies').post(secureRoute, createMovie)               // secure
router.route('/api/movies/:movieId').delete(secureRoute, deleteMovie)    // secure: only milo can delete milo's movies
router.route('/api/movies/:movieId').put(secureRoute, updateMovie)       // secure

app.use(express.json())
app.use(router)


async function start() {
  // ! Before we start express, we connect to the database.
  await mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
  console.log('Connected to the database! 🔥')

  app.listen(8000, () => {
    console.log('Express API is running on http://localhost:8000')
  })
}

start()

