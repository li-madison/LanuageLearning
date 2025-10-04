export default function Books() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Language Learning Books</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-600 mb-8">
              Explore our curated collection of language learning books and resources.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Beginner's Guide</h3>
                <p className="text-gray-600 mb-4">Perfect for those just starting their language learning journey.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                  Read Now
                </button>
              </div>
              
              <div className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar Mastery</h3>
                <p className="text-gray-600 mb-4">Comprehensive guide to mastering grammar rules and structures.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                  Read Now
                </button>
              </div>
              
              <div className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Conversation Practice</h3>
                <p className="text-gray-600 mb-4">Real-world conversations and dialogue examples.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                  Read Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
