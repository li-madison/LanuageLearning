"use client";

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";



export default function BooksPage() {
  const [books, setBooks] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Fetch all book folders (assumes books.json exists in public/books/)
        const res = await fetch("/books/books.json");
        if (!res.ok) throw new Error("Failed to fetch books.json");
        const data: string[] = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBooks();
  }, []);

  if (!books.length) return <p className="text-center mt-20">Loading books...</p>;

  return (
    <div className="min-h-screen bg-[#77d9ff] py-12 bg-stripes">
      <h1 className="text-5xl font-bold text-center mb-12 title">📚 Books</h1>
      <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
        {books.map((title) => (
          <BookCard key={title} title={title} />
        ))}
      </div>
    </div>
  );
}
