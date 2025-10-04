export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Language Learner</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Language Learner is a comprehensive platform designed to help you master new languages through interactive learning experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-gray-600">
                    We believe that learning a new language should be engaging, effective, and accessible to everyone. 
                    Our platform combines traditional learning methods with modern technology to create an immersive experience.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Interactive vocabulary games</li>
                    <li>• Comprehensive book library</li>
                    <li>• Progress tracking</li>
                    <li>• Multiple language support</li>
                    <li>• Adaptive learning paths</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">Get Started Today</h2>
                <p className="text-blue-700 mb-4">
                  Join thousands of learners who are already improving their language skills with our platform.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
