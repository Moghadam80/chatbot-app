import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered E-commerce Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of customer service with our intelligent chatbot that helps customers find products, answer questions, and provide personalized recommendations.
            </p>
            <Link 
              href="/chat" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Try the Chatbot
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-96 w-full">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 h-full flex flex-col">
                  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <p className="text-gray-800">Hello! How can I help you find the perfect product today?</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 mb-4 shadow-sm ml-auto max-w-[80%]">
                    <p className="text-gray-800">I'm looking for a new laptop for video editing.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-800">I'd be happy to help! Based on your needs, I recommend our ProBook X15 with 16GB RAM and dedicated graphics card. It's perfect for video editing and currently on sale for $1,299.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-16 text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Responses</h3>
              <p className="text-gray-600">
                Powered by Google's Gemini AI to provide intelligent, context-aware responses to customer inquiries.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">Product Recommendations</h3>
              <p className="text-gray-600">
                Intelligently suggests products based on customer queries and browsing history.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="text-blue-600 text-2xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Conversation History</h3>
              <p className="text-gray-600">
                Maintains conversation context to provide a seamless, personalized shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask a Question</h3>
              <p className="text-gray-600">Type your product-related question in the chat interface.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-gray-600">Our AI analyzes your query and searches the product database.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive personalized product recommendations and answers.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
              <p className="text-gray-600">Rate responses to help improve the chatbot's performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Try our AI-powered chatbot now and see how it can transform your shopping experience.
          </p>
          <Link 
            href="/chat" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Start Chatting
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">AI E-commerce Assistant</h3>
              <p className="text-gray-400 mt-2">Powered by Next.js and Google Gemini AI</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AI E-commerce Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 