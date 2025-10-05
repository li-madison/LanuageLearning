"use client"; // needed if you use state or effects

import "../globals.css";
import BookCard from "../components/BookCard";

export default function BooksPage() {
  const books = [
    { title: "The Friendly Fox", author: "Jane Doe" },
    { title: "Panda’s Picnic", author: "John Smith" },
    { title: "Owl Learns to Read", author: "Emily Green" },
    { title: "Magical Word Garden", author: "Sarah Lee" },
  ];

  return (
    <div className="min-h-screen bg-[#77d9ff] bg-stripes py-12 relative overflow-hidden pt-10">
      <h1 className="text-5xl font-bold text-center text-[#1EC0FF] mb-12 title">
        📚 Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 max-w-6xl mx-auto">
        {books.map((book) => (
          <BookCard key={book.title} title={book.title} author={book.author} />
        ))}
      </div>
    </div>
  );
}
