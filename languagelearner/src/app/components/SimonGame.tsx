
"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, Heart, Loader2, RotateCcw } from 'lucide-react';

type ShapeOption = {
  color: string;
  shape: string;
};

type QuestionData = {
  command: string;
  correctAnswer: ShapeOption;
  wrongOptions: ShapeOption[];
};

export default function SimonGameHome() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <SimonGamePlay onBackToHome={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#caf0f8] to-[#90e0ef] flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="title text-7xl font-bold mb-4 text-[#1EC0FF]">
            Simon Says!
          </h1>
          <p className="text text-2xl mt-10 text-gray-600 font-semibold">
            Listen carefully and pick the right shape!
          </p>
        </div>

        <div className="bg-[#1EC0FF] bg-opacity-20 rounded-2xl p-8 mb-8">
          <h2 className="text text-3xl font-bold text-white mb-4 text-center">
            How to Play:
          </h2>
          <ul className="text-lg text-white space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎧</span>
              <span>Listen to Simon's command</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔴🔵🟢</span>
              <span>Look at the colored shapes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">👆</span>
              <span>Click on the correct shape and color</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">❤️</span>
              <span>You have 3 lives - don't lose them all!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <span>Match 5 shapes to win!</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setGameStarted(true)}
          className="w-full bg-[#56D57E] hover:bg-[#45c46d] text text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
        >
          START GAME! 🚀
        </button>
      </div>
    </div>
  );
}

function SimonGamePlay({ onBackToHome }: { onBackToHome: () => void }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedShape, setSelectedShape] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [shapeOptions, setShapeOptions] = useState<ShapeOption[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [usedCombinations, setUsedCombinations] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

// Load round when game starts or round changes
  useEffect(() => {
    if (!gameOver && !gameWon) {
      loadRound();
    }
  }, [currentRound]);

  // Reset used combinations when game restarts
  useEffect(() => {
    if (currentRound === 0 && !gameOver && !gameWon) {
      setUsedCombinations([]);
    }
  }, [currentRound, gameOver, gameWon]);

  const loadRound = async () => {
    setIsLoading(true);
    setSelectedShape(null);
    setShowFeedback(false);

    try {
      // Call Gemini API to generate question with used combinations
      const response = await fetch('/api/generate-shape-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usedCombinations }),
      });

      if (!response.ok) throw new Error('Failed to generate question');

      const data: QuestionData = await response.json();
      setQuestionData(data);

      // Track this combination as used
      const combinationKey = `${data.correctAnswer.color}-${data.correctAnswer.shape}`;
      setUsedCombinations(prev => [...prev, combinationKey]);

      // Randomize shape positions
      const allOptions = [data.correctAnswer, ...data.wrongOptions];
      const shuffled = allOptions.sort(() => Math.random() - 0.5);
      setShapeOptions(shuffled);

      setIsLoading(false);

      // Auto-play audio after a short delay
      setTimeout(() => playAudio(data.command), 250);
    } catch (error) {
      console.error('Error loading round:', error);
      setIsLoading(false);
    }
  };

  const playAudio = async (text: string) => {
    setIsPlayingAudio(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        } else {
          audioRef.current = new Audio(audioUrl);
        }

        audioRef.current.onended = () => {
          setIsPlayingAudio(false);
          URL.revokeObjectURL(audioUrl);
        };

        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Audio error:', error);
      setIsPlayingAudio(false);
    }
  };

  const handleShapeClick = (index: number) => {
    if (showFeedback || selectedShape !== null || !questionData) return;

    setSelectedShape(index);
    const clickedShape = shapeOptions[index];
    const correct = 
      clickedShape.color === questionData.correctAnswer.color &&
      clickedShape.shape === questionData.correctAnswer.shape;
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }
  };

  const handleSubmit = () => {
    if (!showFeedback) return;

    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Check game end conditions
    if (score + (isCorrect ? 1 : 0) >= 6) {
      setGameWon(true);
    } else if (lives - (isCorrect ? 0 : 1) <= 0) {
      setGameOver(true);
    } else if (currentRound < 4) {
      setCurrentRound(currentRound + 1);
    } else {
      // Final round completed
      if (score + (isCorrect ? 1 : 0) >= 3) {
        setGameWon(true);
      } else {
        setGameOver(true);
      }
    }
  };

  if (gameWon || gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#caf0f8] to-[#90e0ef] flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="text-8xl mb-6 ml-6">{gameWon ? '🎉' : '😢'}</div>
          <h2 className="text text-6xl font-bold mb-6 text-[#56D57E]">
            {gameWon ? 'You Won!' : 'Game Over!'}
          </h2>
          <p className="text text-3xl text-gray-700 mb-2">
            Final Score:
          </p>
          <p className="text-5xl font-bold text-[#1EC0FF] mb-8">{score}/5</p>
          <button
            onClick={onBackToHome}
            className="bg-[#56D57E] hover:bg-[#45c46d] text text-white font-bold py-4 px-10 rounded-2xl text-2xl flex items-center gap-3 mx-auto transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <RotateCcw className="w-7 h-7" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#caf0f8] to-[#90e0ef] flex flex-col items-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-5xl">
        <h1 className="title text-5xl font-bold text-center mb-8 text-[#1EC0FF]">
          Simon Says
        </h1>

        {/* Score and Lives Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-gray-700">Lives:</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-8 h-8 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>

          <div className="text-2xl font-semibold text-gray-700">
            Round {currentRound + 1}/5
          </div>

          <div className="flex items-center gap-2">
            <span className="text-4xl">⭐</span>
            <span className="text-2xl font-bold text-gray-700">{score}/5</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <Loader2 className="w-16 h-16 text-[#1EC0FF] animate-spin" />
            <p className="text-2xl text-gray-600">Loading next challenge...</p>
          </div>
        ) : (
          <>
            {/* Question Box */}
            {questionData && (
              <div className="bg-[#1EC0FF] bg-opacity-50 rounded-2xl p-6 mb-8 text-center">
                <div className="flex items-center justify-center gap-4">
                  <p className="text-3xl font-bold text-gray-800">
                    {questionData.command}
                  </p>
                  <button
                    onClick={() => playAudio(questionData.command)}
                    disabled={isPlayingAudio}
                    className="p-3 bg-white rounded-full hover:bg-gray-100 disabled:opacity-50 transition-all shadow-md"
                  >
                    <Volume2 className="w-7 h-7 text-[#1EC0FF]" />
                  </button>
                </div>
              </div>
            )}

            {/* Shapes Display */}
            <div className="bg-gradient-to-b from-[#caf0f8] to-[#90e0ef] rounded-2xl p-8 mb-6 min-h-[300px] flex items-center justify-center gap-12">
              {shapeOptions.map((option, index) => (
                <ShapeButton
                  key={index}
                  color={option.color}
                  shape={option.shape}
                  isSelected={selectedShape === index}
                  showFeedback={showFeedback}
                  isCorrect={isCorrect}
                  onClick={() => handleShapeClick(index)}
                  disabled={showFeedback}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!showFeedback}
                className="bg-[#56D57E] hover:bg-[#45c46d] disabled:bg-gray-400 text text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-lg disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                {showFeedback ? 'NEXT ➡️' : 'Pick a shape!'}
              </button>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-6 text text-4xl font-bold ${isCorrect ? 'text-[#56D57E]' : 'text-red-500'}`}>
                  {isCorrect ? '✓ Correct! 🎉' : '✗ Try again next time!'}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ShapeButton({
  color,
  shape,
  isSelected,
  showFeedback,
  isCorrect,
  onClick,
  disabled
}: {
  color: string;
  shape: string;
  isSelected: boolean;
  showFeedback: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  const colorMap: Record<string, string> = {
    red: '#EF4444',
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#fcff4aff',
    purple: '#A855F7',
    orange: '#F97316',
    pink: '#EC4899',
  };

  const fillColor = colorMap[color.toLowerCase()] || '#6B7280';
  
  let borderColor = 'border-white';
  if (showFeedback && isSelected) {
    borderColor = isCorrect ? 'border-[#56D57E]' : 'border-red-500';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-8 ${borderColor} rounded-2xl bg-white p-6 transform hover:scale-110 transition-all disabled:cursor-not-allowed shadow-xl ${
        showFeedback && isSelected ? 'scale-110' : ''
      }`}
    >
      <svg width="180" height="180" viewBox="0 0 200 200">
        {shape === 'circle' && (
          <circle cx="100" cy="100" r="80" fill={fillColor} />
        )}
        {shape === 'square' && (
          <rect x="20" y="20" width="160" height="160" fill={fillColor} />
        )}
        {shape === 'triangle' && (
          <polygon points="100,20 20,180 180,180" fill={fillColor} />
        )}
        {shape === 'rectangle' && (
          <rect x="30" y="50" width="140" height="100" fill={fillColor} />
        )}
        {shape === 'star' && (
          <polygon 
            points="100,20 115,70 165,70 125,100 140,150 100,120 60,150 75,100 35,70 85,70" 
            fill={fillColor} 
          />
        )}
        {shape === 'heart' && (
          <path 
            d="M100,170 C100,170 30,120 30,80 C30,50 50,30 70,30 C85,30 95,40 100,50 C105,40 115,30 130,30 C150,30 170,50 170,80 C170,120 100,170 100,170 Z" 
            fill={fillColor} 
          />
        )}
      </svg>
    </button>
  );
}