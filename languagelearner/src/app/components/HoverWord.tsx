"use client";

import { useState } from "react";
import axios from "axios";

const translationCache: Record<string, string> = {};

type HoverWordProps = {
  word: string;
  targetLang: string;
};

export default function HoverWord({ word, targetLang }: HoverWordProps) {
  const [translation, setTranslation] = useState<string | null>(
    translationCache[`${word}_${targetLang}`] || null
  );
  const [show, setShow] = useState(false);

  const handleMouseEnter = async () => {
    setShow(true);
  
    if (!translation) {
      const cacheKey = `${word}_${targetLang}`;
      if (translationCache[cacheKey]) {
        setTranslation(translationCache[cacheKey]);
        return;
      }
  
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            text: word,        // <-- make sure this is the word
            target: "es" // <-- and this is the language code
          }),
        });
  
        const data = await res.json();
        translationCache[cacheKey] = data.translated;
        setTranslation(data.translated);
      } catch (err) {
        console.error("Translation error:", err);
        setTranslation("?");
      }
    }
  };
  

  const handleMouseLeave = () => setShow(false);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer hover:text-blue-600"
    >
      {word}
      {show && translation && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 bg-gray-100 text-black text-sm p-1 rounded shadow-lg z-50 whitespace-nowrap">
          {translation}
        </span>
      )}
      {" "}
    </span>
  );
}
