import '../globals.css'

import BookCard from "../components/BookCard";

export default function BooksPage() {
  const books = [
    { title: "The Friendly Fox", author: "Jane Doe", description: "Learn English with a cute fox adventure." },
    { title: "Panda’s Picnic", author: "John Smith", description: "A story full of food, friends, and new words." },
    { title: "Owl Learns to Read", author: "Emily Green", description: "Follow Owl’s journey into books and language." },
    { title: "Magical Word Garden", author: "Sarah Lee", description: "Grow your vocabulary in a magical garden." },
  ];

  return (
    <div className="min-h-screen bg-[#77d9ff] bg-stripes py-12 relative overflow-hidden pt-10">
      <h1 className="text-5xl font-bold text-center text-[#1EC0FF] mb-12 title">
        📚 Books
      </h1>

      <div className="grid grid-cols-1 w-full gap-8 max-w-6xl mx-auto">
        {books.map((book) => (
          <BookCard
            key={book.title}
            title={book.title}
            author={book.author}
          />
        ))}
      </div>
    </div>
  );
}