import Movies from '../models/movies'
import { Request, Response } from 'express'

export const updateMovie = async (req : Request, res: Response) => {
    // ! 1) Get the movieId
    const movieId = req.params.movieId
    const update = req.body
    // ! 2) Update the movie
    const updatedMovie = await Movies.findByIdAndUpdate(movieId, update, { new: true }) // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedMovie)
}

export const deleteMovie = async (req : Request, res: Response) => {
    // ! 1) Get the movieId 
    const movieId = req.params.movieId
    // ! 2) Delete the movie 
    const deletedMovie = await Movies.findByIdAndDelete(movieId)
    // const deletedMovie = await Movies.findOneAndDelete({ _id: movieId }) // ? Alternative method.
    // ! 3) Send back deleted movie
    res.send(deletedMovie)
}

export const createMovie = async (req : Request, res: Response) => {
    console.log('POSTING!', req.body)
    const movie = await Movies.create(req.body)
    res.send(movie)
}

export const getMovieById = async (req: Request, res: Response) => {
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
  }

export const getMovies = async (req : Request, res: Response) => {
    const movies = await Movies.find();
    res.send(movies)
  }