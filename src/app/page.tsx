'use client';

import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

// Film posterleri için URLs
const moviePosters = [
  'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', // Oppenheimer
  'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg', // Barbie
  'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg', // The Batman
  'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg', // Avengers: Endgame
  'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', // Inception
];

// Film verileri
const featuredMovies = [
  { id: 1, title: "Oppenheimer", year: 2023, poster: moviePosters[0] },
  { id: 2, title: "Barbie", year: 2023, poster: moviePosters[1] },
  { id: 3, title: "The Batman", year: 2022, poster: moviePosters[2] },
  { id: 4, title: "Avengers: Endgame", year: 2019, poster: moviePosters[3] },
  { id: 5, title: "Inception", year: 2010, poster: moviePosters[4] },
  { id: 6, title: "Oppenheimer", year: 2023, poster: moviePosters[0] },
  { id: 7, title: "Barbie", year: 2023, poster: moviePosters[1] },
  { id: 8, title: "The Batman", year: 2022, poster: moviePosters[2] },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <Navbar />
      
      {/* Floating Movie Posters Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {moviePosters.map((poster, index) => (
          <motion.div
            key={index}
            className="absolute w-72 h-96 rounded-lg overflow-hidden"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              rotate: 0,
              opacity: 0.1
            }}
            animate={{
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
              y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-800 to-red-800 animate-pulse">
              {/* Poster placeholder - replace src with actual movie posters */}
              <div className="w-full h-full bg-cover bg-center opacity-50"
                   style={{ backgroundImage: `url(${poster})` }}>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex min-h-screen pt-24">
        {/* Left Advertisement */}
        <div className="hidden lg:flex w-64 bg-black/50 backdrop-blur-lg border-r border-gray-800">
          <div className="p-4 w-full">
            <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src="/images/kamyon.jpg"
                alt="Heavy Duty Truck"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500 mb-2">
              Power Meets Efficiency
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Experience the next generation of heavy-duty trucks. Built for performance, designed for comfort.
            </p>
            <ul className="text-gray-500 text-xs space-y-1 mb-4">
              <li>• 500+ Horsepower</li>
              <li>• Advanced Safety Features</li>
              <li>• Eco-Friendly Engine</li>
            </ul>
            <button className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Learn More
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Hero Section */}
          <div className="relative px-6 py-20">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-16 relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search for movies..."
                    className="w-full bg-black/50 backdrop-blur-lg text-white px-6 py-4 rounded-full border-2 border-transparent focus:border-purple-500/50 focus:outline-none text-lg"
                  />
                  <button className="absolute right-4 text-purple-500 hover:text-red-500 transition-colors duration-200">
                    <SearchIcon className="text-3xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Movies */}
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <StarIcon className="text-yellow-500 mr-2" />
                Featured Movies
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredMovies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    className="group relative rounded-xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="aspect-[2/3] bg-gradient-to-br from-purple-800 to-red-800 animate-pulse">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold mb-1">{movie.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{movie.year}</span>
                          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200">
                            <PlayArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Advertisement */}
        <div className="hidden lg:flex w-64 bg-black/50 backdrop-blur-lg border-l border-gray-800">
          <div className="p-4 w-full">
            <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src="/images/kamyon.jpg"
                alt="Heavy Duty Truck"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 mb-2">
              Built for the Long Haul
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Discover unmatched durability and comfort in our premium truck series. Your journey, our commitment.
            </p>
            <ul className="text-gray-500 text-xs space-y-1 mb-4">
              <li>• Spacious Cabin Design</li>
              <li>• Smart Navigation System</li>
              <li>• 24/7 Support Service</li>
            </ul>
            <button className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
