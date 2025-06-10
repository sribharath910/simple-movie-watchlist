const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/Movie');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movie_watchlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

app.patch('/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  movie.watched = !movie.watched;
  await movie.save();
  res.json(movie);
});

app.delete('/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
