// * This file is responsible for defining your own model (type) for your data (movie)

import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
  // ! Adding something called a "referencing relationship"
  // ! Essentially, this user must be a reference to a real user
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Movie', movieSchema)