// * This file is responsible for defining your own model (type) for your data (movie)

import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true }
})

export default mongoose.model('Movie', movieSchema)