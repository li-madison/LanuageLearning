
import React, { useState, useEffect } from 'react';
import { Star, RotateCcw } from 'lucide-react';

interface WordPair {
  english: string;
  spanish: string;
  emoji: string;
}

interface Card {
  id: number;
  content: string;
  type: 'picture' | 'word';
  pairId: number;
}

const PictureMatchingGame = () => {
  const wordPairs: WordPair[] = [
    { english: 'bad', spanish: 'malo', emoji: '👎' },
    { english: 'cold', spanish: 'frío', emoji: '❄️' },
    { english: 'tree', spanish: 'árbol', emoji: '🌳' },
    { english: 'orange', spanish: 'naranja', emoji: '🍊' },
    { english: 'blue', spanish: 'azul', emoji: '🔵' },
    { english: 'runs', spanish: 'corre', emoji: '🏃' },
    { english: 'book', spanish: 'libro', emoji: '📚' },
    { english: 'keys', spanish: 'llaves', emoji: '🔑' },
    { english: 'she', spanish: 'ella', emoji: '👧' }
  ];

  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
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
      gameCards.push({ id: idx * 2, content: pair.emoji, type: 'picture', pairId: idx });
      gameCards.push({ id: idx * 2 + 1, content: pair.english, type: 'word', pairId: idx });
    });
    
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelected(null);
    setMatched([]);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (matched.includes(cardId) || gameOver) {
      return;
    }

    if (selected === null) {
      setSelected(cardId);
    } else if (selected === cardId) {
      setSelected(null);
    } else {
      const card1 = cards.find(c => c.id === selected);
      const card2 = cards.find(c => c.id === cardId);

      if (card1 && card2 && card1.pairId === card2.pairId && card1.type !== card2.type) {
        // Correct match!
        setMatched([...matched, card1.id, card2.id]);
        setScore(score + 1);
        setSelected(null);
        
        if (matched.length + 2 === cards.length) {
          setWon(true);
          setGameOver(true);
        }
      } else {
        // Wrong match - deselect
        setSelected(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h1 className="gameTitle text-4xl font-bold text-center mb-6 text-[#1EC0FF]">
        Sets Game
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
            const isSelected = selected === card.id;
            const isMatched = matched.includes(card.id);
            
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center ${
                  isMatched
                    ? 'bg-[#56D57E] text-white cursor-default'
                    : isSelected
                    ? card.type === 'picture'
                      ? 'bg-[#8E7DBE] text-white border-4 border-[#8E7DBE]'
                      : 'bg-[#FFD100] text-white border-4 border-[#FFD100]'
                    : card.type === 'picture'
                    ? 'bg-[#8E7DBE] bg-opacity-20 text-gray-800 hover:bg-opacity-30'
                    : 'bg-[#FFD100] bg-opacity-20 text-gray-800 hover:bg-opacity-30'
                }`}
                disabled={isMatched || gameOver}
              >
                {card.type === 'picture' ? (
                  <span className="text-6xl">{card.content}</span>
                ) : (
                  <span className="text-xl font-bold">{card.content}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-center text-gray-600">
        <p className="text-sm">Click a picture, then click its matching English word!</p>
      </div>
    </div>
  );
};

export default PictureMatchingGame;