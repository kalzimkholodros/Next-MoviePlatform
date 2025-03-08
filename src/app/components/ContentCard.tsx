'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface ContentCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  year: number;
  genre: string[];
  likes: number;
  dislikes: number;
  type: 'movie' | 'series';
}

const ContentCard = ({ id, title, imageUrl, rating, year, genre, likes: initialLikes, dislikes: initialDislikes, type }: ContentCardProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Convert type to plural form for routing
  const routeType = type === 'movie' ? 'movies' : 'series';

  const handleVote = async (voteType: 'like' | 'dislike') => {
    try {
      const response = await fetch(`http://localhost:5000/api/${routeType}/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: voteType }),
        credentials: 'include',
      });

      if (response.status === 401) {
        setError('Please login to vote');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setUserVote(voteType);
      setError(null);
    } catch (err) {
      setError('Failed to submit vote');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-gray-900 rounded-xl overflow-hidden"
    >
      <Link href={`/${routeType}/${id}`}>
        <div className="relative h-[400px] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-red-500 transition-all duration-300">
            {title}
          </h3>

          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <StarIcon className="text-yellow-500 h-4 w-4" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span>|</span>
            <span>{year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {genre.slice(0, 3).map((g, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-purple-600/20 to-red-600/20 border border-purple-500/30 text-gray-300"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('like');
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            userVote === 'like'
              ? 'bg-purple-500/50 text-white'
              : 'bg-black/50 text-gray-400 hover:bg-purple-500/30 hover:text-white'
          }`}
        >
          <ThumbUpIcon className="h-5 w-5" />
          <span className="sr-only">Like</span>
          <span className="absolute -right-2 -top-1 min-w-[20px] h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center px-1">
            {likes}
          </span>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('dislike');
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            userVote === 'dislike'
              ? 'bg-red-500/50 text-white'
              : 'bg-black/50 text-gray-400 hover:bg-red-500/30 hover:text-white'
          }`}
        >
          <ThumbDownIcon className="h-5 w-5" />
          <span className="sr-only">Dislike</span>
          <span className="absolute -right-2 -top-1 min-w-[20px] h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
            {dislikes}
          </span>
        </button>

        {error && (
          <div className="absolute top-full right-0 mt-2 p-2 bg-red-500/90 text-white text-xs rounded-lg whitespace-nowrap backdrop-blur-sm">
            {error}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentCard; 