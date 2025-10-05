"use client";

import { useState } from "react";
import axios from "axios";

// ---------- Translation cache (put here, outside the component) ----------
const translationCache: Record<string, string> = {};

// ---------- Component ----------
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
        const res = await axios.post("/api/translate/translate", {
          text: word,
          target: targetLang,
        });

        translationCache[cacheKey] = res.data.translation;
        setTranslation(res.data.translation);
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
        <span className="absolute bg-gray-100 text-black text-sm p-1 rounded shadow-lg -mt-6 ml-1 z-50">
          {translation}
        </span>
      )}
      {" "}
    </span>
  );
}
