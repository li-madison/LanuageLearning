"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BookViewer() {
  const { book } = useParams();
  const bookTitle = Array.isArray(book) ? book[0] : book || "";
  const [pages, setPages] = useState<{ image: string; text: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchBook() {
      try {
        const encodedBook = encodeURIComponent(bookTitle);
        const res = await fetch(`/books/${encodedBook}/book.json`);
        if (!res.ok) {
          console.error("Failed to fetch book.json:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        setPages(data.pages);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    }
    fetchBook();
  }, [book]);

  if (!pages.length) return <p className="text-center mt-20">Loading book...</p>;

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen bg-[#77d9ff] py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">{book}</h1>
      <img
        src={`/books/${encodeURIComponent(bookTitle)}/${pages[currentPage].image}`}
        alt={`Page ${currentPage + 1}`}
        className="max-w-full mb-4 rounded-xl shadow-lg"
      />
      <p className="bg-white p-4 rounded-lg shadow-md max-w-2xl">{pages[currentPage].text}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-gray-700">Page {currentPage + 1} of {pages.length}</p>
    </div>
  );
}
