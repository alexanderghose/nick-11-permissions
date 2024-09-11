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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const movies_1 = __importDefault(require("./models/movies"));
const app = (0, express_1.default)();
const movieData = [
    { name: 'Diehard', movieId: 1 },
    { name: 'The Grinch', movieId: 2 },
    { name: 'Home Alone', movieId: 3 }
];
const router = express_1.default.Router();
// getting my movies
router.route('/api/movies').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movies_1.default.find();
    res.send(movies);
}));
// Getting an individual movie
router.route('/api/movies/:movieId').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * The try part contains the code that can throw an error.
    try {
        // ! 1) Get the id I need to GET my movie
        const movieId = req.params.movieId;
        // ! 2) Find my movie
        const foundMovie = yield movies_1.default.findById(movieId);
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
}));
// Posting a movie
router.route('/api/movies').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POSTING!', req.body);
    const movie = yield movies_1.default.create(req.body);
    res.send(movie);
}));
// Delete a movie
router.route('/api/movies/:movieId').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! 1) Get the movieId 
    const movieId = req.params.movieId;
    // ! 2) Delete the movie 
    const deletedMovie = yield movies_1.default.findByIdAndDelete(movieId);
    // const deletedMovie = await Movies.findOneAndDelete({ _id: movieId }) // ? Alternative method.
    // ! 3) Send back deleted movie
    res.send(deletedMovie);
}));
// Put a movie
router.route('/api/movies/:movieId').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! 1) Get the movieId
    const movieId = req.params.movieId;
    const update = req.body;
    // ! 2) Update the movie
    const updatedMovie = yield movies_1.default.findByIdAndUpdate(movieId, update, { new: true }); // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedMovie);
}));
app.use(express_1.default.json());
app.use(router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // ! Before we start express, we connect to the database.
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/moviesdb');
        console.log('Connected to the database! 🔥');
        app.listen(8000, () => {
            console.log('Express API is running on http://localhost:8000');
        });
    });
}
start();
