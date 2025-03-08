'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';

interface MovieDetailProps {
  id: number;
  type: 'movie' | 'series';
}

interface ContentDetails {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  year: number;
  genre: string[];
  likes: number;
  dislikes: number;
}

const MovieDetail = ({ id, type }: MovieDetailProps) => {
  const [content, setContent] = useState<ContentDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [voteStatus, setVoteStatus] = useState<{ likes: number; dislikes: number }>({ likes: 0, dislikes: 0 });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${type}/${id}`);
        if (!response.ok) throw new Error('Content not found');
        const data = await response.json();
        setContent(data);
        setVoteStatus({ likes: data.likes, dislikes: data.dislikes });
      } catch (err) {
        setError('Failed to load content');
      }
    };

    fetchContent();
  }, [id, type]);

  const handleVote = async (voteType: 'like' | 'dislike') => {
    try {
      const response = await fetch(`http://localhost:5000/api/${type}/${id}/vote`, {
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

      if (!response.ok) throw new Error('Failed to vote');

      const data = await response.json();
      setVoteStatus(data);
      setUserVote(voteType);
    } catch (err) {
      setError('Failed to submit vote');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="md:w-1/3 relative h-[500px]">
            <Image
              src={content.imageUrl}
              alt={content.title}
              fill
              className="rounded-xl object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="md:w-2/3 space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">
              {content.title}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <StarIcon className="text-yellow-500" />
                <span className="text-lg">{content.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">{content.year}</span>
              <span className="text-gray-400">|</span>
              <div className="flex flex-wrap gap-2">
                {content.genre.map((g, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-600/20 to-red-600/20 border border-purple-500/30"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {content.description}
            </p>

            {/* Voting Section */}
            <div className="flex items-center space-x-8 pt-6">
              <button
                onClick={() => handleVote('like')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  userVote === 'like'
                    ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <ThumbUpIcon />
                <span>{voteStatus.likes}</span>
              </button>

              <button
                onClick={() => handleVote('dislike')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  userVote === 'dislike'
                    ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <ThumbDownIcon />
                <span>{voteStatus.dislikes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 