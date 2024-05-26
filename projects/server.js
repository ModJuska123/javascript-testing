const express = require('express');
const app = express();
const port = 3000 ;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for movies
let movies = [];
let currentId = 1;

// Create a new movie
app.post('/movies', (req, res) => {
  const { title, productionDate, producer, rating } = req.body;
  if (!title || !productionDate || !producer || typeof rating !== 'number') {
    return res.status(400).send('Missing required fields or invalid rating');
  }
  const newMovie = { id: currentId++, title, productionDate, producer, rating };
  movies.push(newMovie);
  res.status(201).send(newMovie);
});

// Get a movie by ID
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id, 10));
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  res.send(movie);
});

// Update a movie's rating by ID
app.put('/movies/:id/rating', (req, res) => {
  const { rating } = req.body;
  if (typeof rating !== 'number') {
    return res.status(400).send('Invalid rating');
  }
  const movie = movies.find(m => m.id === parseInt(req.params.id, 10));
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  movie.rating = rating;
  res.send(movie);
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id, 10));
  if (movieIndex === -1) {
    return res.status(404).send('Movie not found');
  }
  const deletedMovie = movies.splice(movieIndex, 1)[0];
  res.send(deletedMovie);
});

// Get all movies
app.get('/movies', (req, res) => {
  res.send(movies);
});

// Start the server
app.listen(port, () => {
  console.log(`Movie store API listening at http://localhost:${port}`);
});
