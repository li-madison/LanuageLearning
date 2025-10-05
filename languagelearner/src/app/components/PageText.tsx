"use client";

import { useState } from "react";

type PageTextProps = {
  text: string;       // The page text
  targetLang: string; // The language you want to translate to (eg. 'es')
};

export default function PageText({ text, targetLang }: PageTextProps) {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [hoverWordIndex, setHoverWordIndex] = useState<number | null>(null);

  // Split text into words. This is naive, but works.
  const words = text.split(" ");

  const handleHover = async (word: string, index: number) => {
    setHoverWordIndex(index);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, targetLang }),
      });
      const data = await res.json();
      if (data.translatedText) {
        setHoverText(data.translatedText);
      } else {
        setHoverText(word);
      }
    } catch {
      setHoverText(word); // fallback if API fails
    }
  };

  return (
    <p className="flex flex-wrap gap-1 leading-relaxed text-lg">
      {words.map((word, index) => (
        <span
          key={index}
          className="relative cursor-pointer hover:bg-yellow-200 px-1"
          onMouseEnter={() => handleHover(word, index)}
          onMouseLeave={() => setHoverText(null)}
        >
          {word}{" "}
          {hoverText && hoverWordIndex === index && (
            <span className="absolute top-full left-0 bg-white shadow p-1 rounded text-sm z-10 whitespace-nowrap">
              {hoverText}
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
