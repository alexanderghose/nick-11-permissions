import mongoose from 'mongoose'
import express from 'express'
import {Request, Response} from 'express'
import Movies from './models/movies'

const app = express()

const movieData = [
  { name: 'Diehard', movieId: 1 },
  { name: 'The Grinch', movieId: 2 },
  { name: 'Home Alone', movieId: 3 }
]

const router = express.Router()

// getting my movies
router.route('/api/movies').get(async (req, res) => {
  const movies = await Movies.find();
  res.send(movies)
})

// Getting an individual movie
router.route('/api/movies/:movieId').get(async (req: Request, res: Response) => {
  // * The try part contains the code that can throw an error.
  try {
    // ! 1) Get the id I need to GET my movie
    const movieId = req.params.movieId
    // ! 2) Find my movie
    const foundMovie = await Movies.findById(movieId)
    console.log(foundMovie)
    // const foundMovie = await Movies.findOne({ _id: movieId }) // ? Alternative method.
    // ! 3) Send back the movie you found!
    res.send(foundMovie)

  // * The catch part "catches" the error that was "thrown". We can handle it in here.
  } catch (e) {
    console.log(e)
    res.send({ message: "Movie not found. Did you provide a valid movieId?" })
  }
})

// Posting a movie
router.route('/api/movies').post(async (req, res) => {
  console.log('POSTING!', req.body)
  const movie = await Movies.create(req.body)
  res.send(movie)
})

// Delete a movie
router.route('/api/movies/:movieId').delete(async (req, res) => {
  // ! 1) Get the movieId 
  const movieId = req.params.movieId
  // ! 2) Delete the movie 
  const deletedMovie = await Movies.findByIdAndDelete(movieId)
  // const deletedMovie = await Movies.findOneAndDelete({ _id: movieId }) // ? Alternative method.
  // ! 3) Send back deleted movie
  res.send(deletedMovie)
})

// Put a movie
router.route('/api/movies/:movieId').put(async (req, res) => {
  // ! 1) Get the movieId
  const movieId = req.params.movieId
  const update = req.body
  // ! 2) Update the movie
  const updatedMovie = await Movies.findByIdAndUpdate(movieId, update, { new: true }) // ? The final argument returns the updated movie.
  // ! 3) Send back the movie you've updated
  res.send(updatedMovie)
})

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

