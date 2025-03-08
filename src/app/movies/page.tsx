'use client';

import { useState, useEffect } from 'react';
import ContentCard from '@/app/components/ContentCard';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  year: number;
  genre: string[];
  likes: number;
  dislikes: number;
  type: 'movie';
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        const moviesWithType = data.map((movie: any) => ({ ...movie, type: 'movie' as const }));
        setMovies(moviesWithType);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">
          Movies
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <ContentCard
              key={movie.id}
              {...movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 