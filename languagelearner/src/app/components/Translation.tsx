import React, { useState, useEffect, useRef } from 'react';
import { Star, RotateCcw, Heart } from 'lucide-react';

interface WordPair {
  english: string;
  spanish: string;
}

interface Fish {
  id: number;
  word: string;
  x: number;
  y: number;
  speed: number;
  size: number;
}

const TranslationFishing = () => {
  const wordPairs: WordPair[] = [
    { english: 'bad', spanish: 'malo' },
    { english: 'cold', spanish: 'frío' },
    { english: 'tree', spanish: 'árbol' },
    { english: 'orange', spanish: 'naranja' },
    { english: 'blue', spanish: 'azul' },
    { english: 'runs', spanish: 'corre' },
    { english: 'book', spanish: 'libro' },
    { english: 'keys', spanish: 'llaves' },
    { english: 'she', spanish: 'ella' }
  ];

  const [currentTarget, setCurrentTarget] = useState<WordPair | null>(null);
  const [fish, setFish] = useState<Fish[]>([]);
  const [score, setScore] = useState(0);
  const [bait, setBait] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const fishIdCounter = useRef(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!gameOver && currentTarget) {
      const interval = setInterval(() => {
        setFish(prevFish => {
          const updatedFish = prevFish.map(f => ({
            ...f,
            x: f.x + f.speed
          })).filter(f => f.x < 110);

          // If fish swam away and it was the correct answer, spawn it again
          const removedFish = prevFish.filter(f => f.x >= 110);
          const correctFishRemoved = removedFish.some(f => f.word === currentTarget.spanish);
          
          if (correctFishRemoved) {
            // Make sure correct fish is always available
            const newCorrectFish: Fish = {
              id: fishIdCounter.current++,
              word: currentTarget.spanish,
              x: -20,
              y: Math.random() * 70 + 10,
              speed: Math.random() * 0.2 + 0.15,
              size: Math.random() * 20 + 60
            };
            return [...updatedFish, newCorrectFish];
          }

          if (updatedFish.length < prevFish.length) {
            // Spawn new fish to replace those that swam away
            return [...updatedFish, ...spawnNewFish(prevFish.length - updatedFish.length)];
          }

          return updatedFish;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [gameOver, currentTarget, fish]);

  const initializeGame = () => {
    setScore(0);
    setBait(3);
    setGameOver(false);
    setWon(false);
    fishIdCounter.current = 0;
    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    setCurrentTarget(randomPair);
    setFish([]);
    
    // Spawn fish after target is set
    setTimeout(() => {
      setFish(spawnInitialFish(4, randomPair));
    }, 0);
  };

  const selectNewTarget = () => {
    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    setCurrentTarget(randomPair);
    
    // Ensure new target's translation is spawned
    setFish(prevFish => {
      const hasCorrectFish = prevFish.some(f => f.word === randomPair.spanish);
      if (!hasCorrectFish) {
        const newFish: Fish = {
          id: fishIdCounter.current++,
          word: randomPair.spanish,
          x: -20,
          y: Math.random() * 70 + 10,
          speed: Math.random() * 0.2 + 0.15,
          size: Math.random() * 20 + 60
        };
        return [...prevFish, newFish];
      }
      return prevFish;
    });
  };

  const spawnInitialFish = (count: number, target: WordPair): Fish[] => {
    const newFish: Fish[] = [];
    const availableWords = wordPairs.map(pair => pair.spanish);
    const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
    
    // ALWAYS include the correct answer first
    newFish.push({
      id: fishIdCounter.current++,
      word: target.spanish,
      x: -20,
      y: Math.random() * 70 + 10,
      speed: Math.random() * 0.2 + 0.15,
      size: Math.random() * 20 + 60
    });
    
    // Add other random words
    for (let i = 0; i < count - 1 && i < shuffled.length; i++) {
      if (shuffled[i] !== target.spanish) {
        newFish.push({
          id: fishIdCounter.current++,
          word: shuffled[i],
          x: -20,
          y: Math.random() * 70 + 10,
          speed: Math.random() * 0.2 + 0.15,
          size: Math.random() * 20 + 60
        });
      }
    }
    
    return newFish;
  };

  const spawnNewFish = (count: number): Fish[] => {
    if (!currentTarget) return [];
    
    const newFish: Fish[] = [];
    const availableWords = wordPairs.map(pair => pair.spanish);
    const currentFishWords = fish.map(f => f.word);
    const unusedWords = availableWords.filter(word => !currentFishWords.includes(word));
    
    // ALWAYS ensure the correct answer is included if not already on screen
    const hasCorrectFish = currentFishWords.includes(currentTarget.spanish);
    if (!hasCorrectFish) {
      newFish.push({
        id: fishIdCounter.current++,
        word: currentTarget.spanish,
        x: -20,
        y: Math.random() * 70 + 10,
        speed: Math.random() * 0.2 + 0.15,
        size: Math.random() * 20 + 60
      });
      count--;
    }
    
    // Add other random fish
    for (let i = 0; i < count && unusedWords.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * unusedWords.length);
      const word = unusedWords.splice(randomIndex, 1)[0];
      
      if (word !== currentTarget.spanish || hasCorrectFish) {
        newFish.push({
          id: fishIdCounter.current++,
          word,
          x: -20,
          y: Math.random() * 70 + 10,
          speed: Math.random() * 0.2 + 0.15,
          size: Math.random() * 20 + 60
        });
      }
    }
    
    return newFish;
  };

  const handleFishClick = (clickedFish: Fish) => {
    if (!currentTarget || gameOver) return;

    if (clickedFish.word === currentTarget.spanish) {
      // Correct fish!
      setScore(score + 1);
      setFish(prevFish => prevFish.filter(f => f.id !== clickedFish.id));
      
      if (score + 1 >= 5) {
        setWon(true);
        setGameOver(true);
      } else {
        selectNewTarget();
        setFish(prevFish => [...prevFish, ...spawnNewFish(1)]);
      }
    } else {
      // Wrong fish!
      const newBait = bait - 1;
      setBait(newBait);
      setFish(prevFish => prevFish.filter(f => f.id !== clickedFish.id));
      setFish(prevFish => [...prevFish, ...spawnNewFish(1)]);
      
      if (newBait === 0) {
        setGameOver(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h1 className="title text-4xl font-bold text-center mt-10 mb-10 text-[#1EC0FF]">
        Fishing Game
      </h1>

      {gameOver ? (
            <div className="text-center py-12">
            <div className="text-6xl mb-4">{won ? '🎉' : '😢'}</div>
            <h2 className="text text-7xl font-bold mb-6 text-[#56D57E]">
                {won ? 'You Won!' : 'Game Over!'}
            </h2>
            <p className="text text-4xl text-gray-700">
                Final Score: 
            </p>
            <p className="text-2xl mb-5 text-gray-700">{score}/5</p>
            <button
                onClick={initializeGame}
                className="bg-[#56D57E] hover:bg-[#45c46d] text-white font-bold py-3 px-8 rounded-2xl text-xl flex items-center gap-2 mx-auto transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
                <RotateCcw className="w-6 h-6" />
                Play Again
            </button>
            </div>
        ) : (
        <>
          <div className="bg-[#1EC0FF] bg-opacity-50 rounded-2xl p-6 mb-6 text-center">
            <p className="text text-3xl text-black-700 mb-3">Catch the fish with:</p>
            <p className="text-3xl font-bold text-white">
              {currentTarget?.english}
            </p>
          </div>

          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-b from-[#caf0f8] to-[#90e0ef] rounded-2xl overflow-hidden"
            style={{ height: '400px' }}
          >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-left gap-2">
                <span className="text text-3xl mt-10 ml-10 font-semibold text-gray-700">Bait:</span>
                <div className="mt-8 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                    <Heart
                        key={i}
                        className={`w-8 h-8 ${i < bait ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                    />
                    ))}
                </div>
                </div>

                <div className="flex items-right gap-2">
                <Star className="mt-10 w-8 h-8 fill-[#FFD100] text-[#FFD100]" />
                <span className="mt-10 mr-10 text-3xl font-bold text-grey">{score}/5</span>
                </div>
            </div>

            {/* Water waves decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-full h-8 bg-white rounded-full" style={{ top: '30%', animation: 'wave 4s ease-in-out infinite' }}></div>
              <div className="absolute w-full h-8 bg-white rounded-full" style={{ top: '50%', animation: 'wave 3.5s ease-in-out infinite' }}></div>
              <div className="absolute w-full h-8 bg-white rounded-full" style={{ top: '70%', animation: 'wave 4.5s ease-in-out infinite' }}></div>
            </div>

            {fish.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFishClick(f)}
                className="absolute transition-transform hover:scale-110 cursor-pointer"
                style={{
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                }}
              >
                <div className="relative inline-block">
                  <div style={{ fontSize: `${f.size}px` }}>🐟</div>
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-lg px-2 py-1 font-bold text-gray-800 border-2 border-[#56D57E] shadow-md whitespace-nowrap"
                    style={{
                      fontSize: `${f.size / 5}px`,
                    }}
                  >
                    {f.word}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">Click the correct translation before the fish swim away!</p>
          </div>
        </>
      )}

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default TranslationFishing;