"use client";

import PageText from "../../components/PageText";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BookViewer() {
  const params = useParams();
  const bookTitle = decodeURIComponent(Array.isArray(params.book) ? params.book[0] : params.book || ""); // decode in case Next auto-encoded it

  const [pages, setPages] = useState<{ image: string; text: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchBook() {
      try {
        const url = `/books/${encodeURIComponent(bookTitle)}/book.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch book.json");
        const data = await res.json();
        setPages(data.pages);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBook();
  }, [bookTitle]);

  if (!pages.length) return <p className="text-center mt-20">Loading book...</p>;

  return (
    <div className="min-h-screen bg-[#77d9ff] py-12 flex flex-col items-center">
        
      <h1 className="text-6xl font-bold mb-4 text">{bookTitle}</h1>

      <img
        src={`/books/${encodeURIComponent(bookTitle)}/${pages[currentPage].image}`}
        alt={`Page ${currentPage + 1}`}
        className="max-w-200 mb-4 rounded-xl shadow-lg max-h-100"
      />
    <div className="bg-white p-4 rounded-lg shadow-md text-xl max-w-200"> 
        <PageText text={pages[currentPage].text} targetLang="es"/>
    </div>
     





      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pages.length - 1))}
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
