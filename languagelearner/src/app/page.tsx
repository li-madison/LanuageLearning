export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome to Language Learner</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Master new languages through interactive learning, comprehensive books, and engaging games. 
            Start your language learning journey today!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Books</h2>
              <p className="text-gray-600 mb-6">Explore our comprehensive library of language learning books and resources.</p>
              <a href="/books" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Browse Books
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="text-4xl mb-4">🎮</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Games</h2>
              <p className="text-gray-600 mb-6">Learn through interactive games and quizzes that make learning fun.</p>
              <a href="/game" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Play Games
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="text-4xl mb-4">ℹ️</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 mb-6">Learn more about our platform and how we can help you succeed.</p>
              <a href="/about" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-6">Join thousands of learners who are already improving their language skills.</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-colors duration-200">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
