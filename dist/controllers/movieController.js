"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * The try part contains the code that can throw an error.
    try {
        // ! 1) Get the id I need to GET my movie
        const movieId = req.params.movieId;
        // ! 2) Find my movie
        const foundMovie = yield Movies.findById(movieId);
        console.log(foundMovie);
        // const foundMovie = await Movies.findOne({ _id: movieId }) // ? Alternative method.
        // ! 3) Send back the movie you found!
        res.send(foundMovie);
        // * The catch part "catches" the error that was "thrown". We can handle it in here.
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Movie not found. Did you provide a valid movieId?" });
    }
});
