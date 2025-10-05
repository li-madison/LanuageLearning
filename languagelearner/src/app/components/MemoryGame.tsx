import React, { useState, useEffect } from 'react';
import { Star, RotateCcw } from 'lucide-react';

interface WordPair {
  english: string;
  spanish: string;
}

interface Card {
  id: number;
  word: string;
  lang: 'english' | 'spanish';
  pairId: number;
}

const SpanishMemoryGame = () => {
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

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const selectedPairs = wordPairs.slice(0, 5);
    const gameCards: Card[] = [];
    
    selectedPairs.forEach((pair, idx) => {
      gameCards.push({ id: idx * 2, word: pair.english, lang: 'english', pairId: idx });
      gameCards.push({ id: idx * 2 + 1, word: pair.spanish, lang: 'spanish', pairId: idx });
    });
    
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId) || gameOver) {
      return;
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1 && card2 && card1.pairId === card2.pairId && card1.lang !== card2.lang) {
        setTimeout(() => {
          setMatched([...matched, card1.id, card2.id]);
          setScore(score + 1);
          setFlipped([]);
          
          if (matched.length + 2 === cards.length) {
            setWon(true);
            setGameOver(true);
          }
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h1 className="gameTitle text-4xl font-bold text-center mb-6 text-[#56D57E]">
        Memory Game
      </h1>
      
      <div className="flex justify-center items-center mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-8 h-8 fill-[#FFD100] text-[#FFD100]" />
          <span className="text-2xl font-bold text-[#1EC0FF]">{score}/5</span>
        </div>
      </div>

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
        <div className="grid grid-cols-5 gap-4">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id);
            const isMatched = matched.includes(card.id);
            
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                  isMatched
                    ? 'bg-[#56D57E] text-white cursor-default'
                    : isFlipped
                    ? card.lang === 'english'
                      ? 'bg-[#ffd100] text-black'
                      : 'bg-[#ff1e1e] text-black'
                    : 'bg-gray-200 text-transparent hover:bg-gray-300'
                }`}
                disabled={isMatched || gameOver}
              >
                {isFlipped || isMatched ? card.word : '?'}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-center text-gray-600">
        <p className="text-sm">Match English words with their translations!</p>
      </div>
    </div>
  );
};

export default SpanishMemoryGame;