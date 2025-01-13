import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to StockBuddy</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Latest Predictions</h2>
          <p className="text-gray-600">Get the most recent stock price predictions.</p>
          <Link to="/prediction" className="text-blue-500 hover:underline mt-4 inline-block">View Predictions</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DollarSign className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Market Trends</h2>
          <p className="text-gray-600">Explore current market trends and insights.</p>
          <Link to="/stock-search" className="text-blue-500 hover:underline mt-4 inline-block">Explore Trends</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Risk Assessment</h2>
          <p className="text-gray-600">Understand potential risks in your investments.</p>
          <Link to="/learning-center" className="text-blue-500 hover:underline mt-4 inline-block">Learn More</Link>
        </div>
      </div>
      
      <div className="bg-blue-100 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-700 mb-4">New to StockBuddy? Follow these steps to begin your journey:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Create an account or log in</li>
          <li>Set up your portfolio</li>
          <li>Explore stock predictions</li>
          <li>Learn about market analysis</li>
        </ol>
        <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded mt-6 inline-block hover:bg-blue-600 transition-colors">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default HomePage;