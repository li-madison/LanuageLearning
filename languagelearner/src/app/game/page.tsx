
"use client";

import { useState } from "react";
import GameCard from "../components/GameCard";
import SpanishMemoryGame from "../components/MemoryGame";
import TranslationFishing from "../components/Translation";
import SetGame from "../components/MatchingGame";
import SimonGame from "../components/SimonGame";

export default function Game() {
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
  const [isFishingModalOpen, setIsFishingModalOpen] = useState(false);
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [isSetSimonOpen, setIsSetSimonOpen] = useState(false);

  const openMatchingModal = () => setIsMatchingModalOpen(true);
  const closeMatchingModal = () => setIsMatchingModalOpen(false);

  const openFishingModal = () => setIsFishingModalOpen(true);
  const closeFishingModal = () => setIsFishingModalOpen(false);
  
  const openSetModal = () => setIsSetModalOpen(true);
  const closeSetModal = () => setIsSetModalOpen(false);

  const openSimonModal = () => setIsSetSimonOpen(true);
  const closeSimonModal = () => setIsSetSimonOpen(false);

  return (
    <div className="min-h-screen bg-[#77d9ff] bg-stripes py-12 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center text-[#1EC0FF] mt-10 mb-12 title">
        🎮 Games
      </h1>

      <div className="grid grid-cols-2 w-full gap-8 max-w-6xl mx-auto">
        <div onClick={openMatchingModal} className="cursor-pointer">
          <GameCard title={"Memory Match"} />
        </div>
        <div onClick={openFishingModal} className="cursor-pointer">
          <GameCard title={"Fishing"} />
        </div>
        <div onClick={openSetModal} className="cursor-pointer">
          <GameCard title={"Sets"} />
        </div>
        <div onClick={openSimonModal} className="cursor-pointer">
          <GameCard title={"Simon Says!"} />
        </div>
      </div>

      {/* Matching Game Modal */}
      {isMatchingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMatchingModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
            {/* Close Button */}
            <button
              onClick={closeMatchingModal}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Game Component */}
            <SpanishMemoryGame />
          </div>
        </div>
      )}

      {/* Fishing Game Modal */}
      {isFishingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeFishingModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
            {/* Close Button */}
            <button
              onClick={closeFishingModal}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Game Component */}
            <TranslationFishing />
          </div>
        </div>
      )}

      {/* Set Game Modal */}
      {isSetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeSetModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
            {/* Close Button */}
            <button
              onClick={closeSetModal}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Game Component */}
            <SetGame />
          </div>
        </div>
      )}

      {/* Simon Game Modal */}
      {isSetSimonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeSimonModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
            {/* Close Button */}
            <button
              onClick={closeSimonModal}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Game Component */}
            <SimonGame />
          </div>
        </div>
      )}

    </div>
  );
}