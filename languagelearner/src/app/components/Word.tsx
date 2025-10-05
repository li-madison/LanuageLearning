"use client";

import { useState } from "react";

type WordProps = {
  word: string;
};

export default function Word({ word }: WordProps) {
  const [translation, setTranslation] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleMouseEnter = async () => {
    setShow(true);
    if (!translation) {
      try {
        const res = await fetch(`/api/translate?word=${encodeURIComponent(word)}`);
        const data = await res.json();
        setTranslation(data.translation);
      } catch (err) {
        console.error("Translation error:", err);
      }
    }
  };

  const handleMouseLeave = () => setShow(false);

  return (
    <span
      className="relative cursor-pointer hover:bg-yellow-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {word}{" "}
      {show && translation && (
        <span className="absolute -top-6 left-0 bg-black text-white text-xs px-1 rounded z-50">
          {translation}
        </span>
      )}
    </span>
  );
}
