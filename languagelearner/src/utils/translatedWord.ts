// src/utils/translateWord.ts
export async function translateWord(word: string, targetLang: string) {
    const resp = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: word, target: targetLang }),
    });
    const data = await resp.json();
    return data.translated;
  }
  