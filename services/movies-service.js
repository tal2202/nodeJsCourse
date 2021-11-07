const INITIAL_MOVIES = require('./movies.json')

let allMovies = []
let currentIndex = 0

function getAllMovies() {
  return [...allMovies]
}

function getById(id) {
  return getAllMovies().find((movie) => movie.id === id)
}

function createMovie({ title, img, synopsis, rating, year }) {
  const newMovie = {
    id: getNextIndex(),
    title,
    img,
    synopsis,
    rating,
    year,
  }

  allMovies = [...allMovies, newMovie]
  return newMovie
}

function upsertMovie(movieObj){
  movieTitle = movieObj.title
  exsistingMovie = getAllMovies().find((movie)=> movie.title === movieTitle)
  if (exsistingMovie){

    exsistingMovie.title = movieTitle
    exsistingMovie.year = movieObj.year
    exsistingMovie.img = movieObj.img
    exsistingMovie.synopsis = movieObj.synopsis
    exsistingMovie.rating= movieObj.rating

    return [exsistingMovie, 200]

  }
  else{
    newMovie = createMovie(movieObj)
    return [newMovie, 201]
  }
}
function updateMovieById(id, updatingParams){

  movieToUpdate = getAllMovies().find((movie) => movie.id === id)
  if (!movieToUpdate){
    return movieToUpdate
  }
  if (updatingParams.title){
    movieToUpdate.title = updatingParams.title
  }
  if (updatingParams.img){
    movieToUpdate.img = updatingParams.img
  }
  if (updatingParams.synopsis){
    movieToUpdate.synopsis = updatingParams.synopsis
  }
  if (updatingParams.rating){
    movieToUpdate.rating = updatingParams.rating
  }
  if (updatingParams.year){
    movieToUpdate.year = updatingParams.year
  }
  return movieToUpdate
 
}

function deleteMovie(movieId){
  movieToDelete = getAllMovies().find((movie)=> movie.id === movieId)
  if (!movieToDelete){
    return movieToDelete
  }
  else{
    allMovies = getAllMovies().filter((movie) => movie.id != movieId);
    return movieToDelete
  }

}



function init() {
  allMovies = [...INITIAL_MOVIES.movies]
  currentIndex = allMovies[allMovies.length - 1].id
}

function getNextIndex() {
  return ++currentIndex
}

init()

module.exports = { getAllMovies, getById, createMovie, init, upsertMovie, updateMovieById,  deleteMovie}
