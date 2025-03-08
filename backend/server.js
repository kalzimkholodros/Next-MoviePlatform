const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// In-memory data storage
const users = [];
const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    imageUrl: "http://localhost:5000/images/dark-knight.jpg",
    rating: 9.0,
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    likes: 0,
    dislikes: 0,
    voters: []
  },
  {
    id: 2,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "http://localhost:5000/images/inception.jpg",
    rating: 8.8,
    year: 2010,
    genre: ["Action", "Adventure", "Sci-Fi"],
    likes: 0,
    dislikes: 0,
    voters: []
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: "http://localhost:5000/images/interstellar.jpg",
    rating: 8.6,
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    likes: 0,
    dislikes: 0,
    voters: []
  },
  {
    id: 4,
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    imageUrl: "http://localhost:5000/images/matrix.jpg",
    rating: 8.7,
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    likes: 0,
    dislikes: 0,
    voters: []
  }
];

const series = [
  {
    id: 1,
    title: "Breaking Bad",
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future as he battles terminal lung cancer.",
    imageUrl: "http://localhost:5000/images/breaking-bad.jpg",
    rating: 9.5,
    year: 2008,
    genre: ["Crime", "Drama", "Thriller"],
    likes: 0,
    dislikes: 0,
    voters: []
  },
  {
    id: 2,
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    imageUrl: "http://localhost:5000/images/got.jpg",
    rating: 9.3,
    year: 2011,
    genre: ["Action", "Adventure", "Drama"],
    likes: 0,
    dislikes: 0,
    voters: []
  },
  {
    id: 3,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    imageUrl: "http://localhost:5000/images/stranger-things.jpg",
    rating: 8.7,
    year: 2016,
    genre: ["Drama", "Fantasy", "Horror"],
    likes: 0,
    dislikes: 0,
    voters: []
  }
];

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.get('/api/check-auth', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword
  };
  
  users.push(user);
  
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '24h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  res.json({ message: "User created successfully" });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '24h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  res.json({ message: "Logged in successfully" });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out successfully" });
});

// Movie Routes
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(movie);
});

app.post('/api/movies/:id/vote', authenticateToken, (req, res) => {
  const { type } = req.body; // 'like' or 'dislike'
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);
  
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const userVoteIndex = movie.voters.findIndex(v => v.userId === req.user.id);
  
  if (userVoteIndex !== -1) {
    // User already voted, update their vote
    const oldVote = movie.voters[userVoteIndex].vote;
    if (oldVote === type) {
      return res.status(400).json({ message: "You've already voted this way" });
    }
    
    // Remove old vote
    if (oldVote === 'like') movie.likes--;
    else movie.dislikes--;
    
    // Add new vote
    if (type === 'like') movie.likes++;
    else movie.dislikes++;
    
    movie.voters[userVoteIndex].vote = type;
  } else {
    // New vote
    if (type === 'like') movie.likes++;
    else movie.dislikes++;
    movie.voters.push({ userId: req.user.id, vote: type });
  }
  
  res.json({ likes: movie.likes, dislikes: movie.dislikes });
});

// Series Routes
app.get('/api/series', (req, res) => {
  res.json(series);
});

app.get('/api/series/:id', (req, res) => {
  const serie = series.find(s => s.id === parseInt(req.params.id));
  if (!serie) {
    return res.status(404).json({ message: "Series not found" });
  }
  res.json(serie);
});

app.post('/api/series/:id/vote', authenticateToken, (req, res) => {
  const { type } = req.body; // 'like' or 'dislike'
  const serieId = parseInt(req.params.id);
  const serie = series.find(s => s.id === serieId);
  
  if (!serie) {
    return res.status(404).json({ message: "Series not found" });
  }

  const userVoteIndex = serie.voters.findIndex(v => v.userId === req.user.id);
  
  if (userVoteIndex !== -1) {
    // User already voted, update their vote
    const oldVote = serie.voters[userVoteIndex].vote;
    if (oldVote === type) {
      return res.status(400).json({ message: "You've already voted this way" });
    }
    
    // Remove old vote
    if (oldVote === 'like') serie.likes--;
    else serie.dislikes--;
    
    // Add new vote
    if (type === 'like') serie.likes++;
    else serie.dislikes++;
    
    serie.voters[userVoteIndex].vote = type;
  } else {
    // New vote
    if (type === 'like') serie.likes++;
    else serie.dislikes++;
    serie.voters.push({ userId: req.user.id, vote: type });
  }
  
  res.json({ likes: serie.likes, dislikes: serie.dislikes });
});

// Featured Content Route
app.get('/api/featured', (req, res) => {
  // Return top 4 movies for the homepage
  const featuredMovies = movies.slice(0, 4);
  res.json(featuredMovies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 