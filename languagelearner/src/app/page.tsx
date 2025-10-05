"use client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import Link from 'next/link';

export default function Home() {
  
  return (
    <UserProvider>

    
    <div className="min-h-screen bg-[#77d9ff] bg-stripes py-12 relative overflow-hidden">
      {/* Mascots */}
      
      <img src="/mascots/owl.png" alt="Owl Mascot" className="absolute bottom-16 right-8 w-40 z-40 opacity-90" />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
        
          <div className="flex flex-row text-center justify-center relative pb-30">
          <img src="/mascots/fox.png" alt="Fox Mascot" className="w-25 z-40 opacity-90 absolute left-0 bottom--1" />
          <h1 className="title absolute bottom-7">
            Welcome!!!
          </h1>

          </div>
     
          

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-6xl font-bold text-orange-600 mb-4 text">Books</h2>
              <p className="text-gray-600 mb-6">Explore a library of kid-friendly language books and stories.</p>
              <a
                href="/books"
                className="inline-block bg-gradient-to-r from-[#ff1e1e] to-[#f49236] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition"
              >
                Browse Books
              </a>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎮</div>
              <h2 className="text-6xl font-bold text-green-600 mb-4 text">Games</h2>
              <p className="text-gray-600 mb-6">Play interactive games that make learning feel like fun!</p>
              <a
                href="/game"
                className="inline-block bg-gradient-to-r from-green-400 to-lime-400 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-transform transform"
              >
                Play Games
              </a>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="text-6xl font-bold text-purple-600 mb-4 text">About</h2>
              <p className="text-gray-600 mb-6 ">Discover how our platform helps you succeed in language learning.</p>
              <a
                href="/about"
                className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-10 text-white shadow-xl">
            <h2 className="text text-3xl font-extrabold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg md:text-xl mb-6">Join thousands of learners already having fun with languages.</p>
            <Link href="/signin" className="text text-2xl bg-yellow-300 text-orange-700 font-bold py-4 px-10 rounded-full shadow-md hover:scale-105 hover:bg-yellow-400 transition">
              Get Started Now 🚀
            </Link>
          </div>
        </div>
      </div>
    </div>
    </UserProvider>
  );
}