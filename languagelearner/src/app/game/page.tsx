export default function Game() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Language Learning Game</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to the language learning game! This is where you can practice your language skills through interactive games.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Vocabulary Quiz</h3>
                <p className="text-blue-700">Test your vocabulary knowledge with multiple choice questions.</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Word Matching</h3>
                <p className="text-green-700">Match words with their translations or definitions.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Sentence Builder</h3>
                <p className="text-purple-700">Practice grammar by building correct sentences.</p>
              </div>
            </div>
            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Start Playing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
