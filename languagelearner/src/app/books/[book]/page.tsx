
"use client";

import PageText from "../../components/PageText";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

export default function BookViewer() {
  const params = useParams();
  const bookTitle = decodeURIComponent(Array.isArray(params.book) ? params.book[0] : params.book || "");

  const [pages, setPages] = useState<{ image: string; text: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpanish, setIsSpanish] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const url = `/books/${encodeURIComponent(bookTitle)}/book.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch book.json");
        const data = await res.json();
        setPages(data.pages);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBook();
  }, [bookTitle]);

  const speakText = async () => {
    if (isPlaying && audioRef.current) {
      // Stop current audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      // Call your API route to generate speech
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: pages[currentPage].text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      // Get the audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
      } else {
        audioRef.current = new Audio(audioUrl);
      }

      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Stop audio when page changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, [currentPage]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (!pages.length) return <p className="text-center mt-20">Loading book...</p>;

  return (
    <div className="min-h-screen bg-[#77d9ff] py-12 flex flex-col items-center">
        
      {/* Title and Language Toggle */}
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-6xl font-bold">{bookTitle}</h1>  
      </div>

      <img
        src={`/books/${encodeURIComponent(bookTitle)}/${pages[currentPage].image}`}
        alt={`Page ${currentPage + 1}`}
        className="max-w-200 mb-4 rounded-xl shadow-lg max-h-100"
      />
      
      {/* Text box and audio button container */}
      <div className="flex gap-3 items-start max-w-200">
        <div className="bg-white p-4 rounded-lg shadow-md text-xl flex-1"> 
          {isSpanish ? (
            <PageText text={pages[currentPage].text} targetLang="es"/>
          ) : (
            <p>Hola! Mi dora!</p>
          )}
        </div>
        
        <button
          onClick={speakText}
          disabled={isLoading}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-gray-700 animate-spin" />
          ) : isPlaying ? (
            <VolumeX className="w-6 h-6 text-gray-700" />
          ) : (
            <Volume2 className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pages.length - 1))}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-gray-700">Page {currentPage + 1} of {pages.length}</p>

      <div>
      <button
          onClick={() => setIsSpanish(!isSpanish)}
          className="absolute bottom-10 right-10 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle language"
        >
          <span className={`text-sm font-semibold ${isSpanish ? 'text-blue-600' : 'text-gray-400'}`}>
            EN
          </span>
          <div className="relative w-12 h-6 bg-gray-300 rounded-full transition-colors">
            <div 
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-blue-600 rounded-full transition-transform ${
                isSpanish ? 'translate-x-0' : 'translate-x-6'
              }`}
            />
          </div>
          <span className={`text-sm font-semibold ${!isSpanish ? 'text-blue-600' : 'text-gray-400'}`}>
            ES
          </span>
        </button>
      </div>

    </div>
  );
}