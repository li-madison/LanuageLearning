"use client";

import HoverWord from "./HoverWord";

type PageTextProps = {
  text: string;
  targetLang: "es";
};

export default function PageText({ text, targetLang }: PageTextProps) {
  const words = text.split(" ");

  return (
    <p className="flex flex-wrap gap-1">
      {words.map((word, index) => (
        <HoverWord key={index} word={word} targetLang="es"/>
      ))}
    </p>
  );
}
