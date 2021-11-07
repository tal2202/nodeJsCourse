const MoviesService = require('../services/movies-service')

function getMovies(request, response) {
  let { offset, limit } = request.query
  const allMovies = MoviesService.getAllMovies()
  let relevantMovies = allMovies.slice()

  if (offset) {
    offset = parseInt(offset, 10)
    relevantMovies = relevantMovies.slice(offset)
  }

  if (limit) {
    limit = parseInt(limit, 10)
    relevantMovies = relevantMovies.slice(0, limit)
  }

  return response.status(200).json({ movies: relevantMovies, total: relevantMovies.length })
}

function getById(request, response) {
  const { id } = request.params
  const movieId = parseInt(id, 10)
  const movie = MoviesService.getById(movieId)

  if (!!movie) {
    return response.status(200).json(movie)
  } else {
    return response.status(404).json({ error: `movie with id ${movieId} was not found` })
  }
}

function createMovie(request, response) {

  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if (!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if (!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if (!year) {
    return response.status(400).json({ error: 'year is a required body param' })
  }

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

function upsertMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body
  const movieObj = request.body
  if (!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if (!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if (!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if (!year) {
    return response.status(400).json({ error: 'year is a required body param' })
  }

  const UpdatedMovie = MoviesService.upsertMovie(movieObj)
  return response.status(UpdatedMovie[1]).json(UpdatedMovie[0])
}


function modifyMovie(request, response) {
  let { id } = request.params
  id = parseInt(id, 10)
  const { title, img, synopsis, rating, year } = request.body
  let updatingParams = {
    title,
    img,
    synopsis,
    rating,
    year
  }


  updatedMovie = MoviesService.updateMovieById(id, updatingParams)
  if (updatedMovie) {
    return response.status(200).json(updatedMovie)
  }
  else{
    return response.status(404).json({ error: `movie with id ${id} was not found` })
  }


}

function deleteMovie(request, response) {
  let { id } = request.params
  id = parseInt(id, 10)
  deltetedMovie = MoviesService.deleteMovie(id)
  if (deltetedMovie){
    return response.status(200).json(deltetedMovie)
  }
  else{
    return response.status(404).json({ error: `movie with id ${id} was not found` })
  }
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
