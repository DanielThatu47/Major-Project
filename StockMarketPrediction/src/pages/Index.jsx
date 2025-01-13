import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access all features",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to StockPredict</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your intelligent platform for stock market analysis and predictions
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            className="w-full md:w-auto px-8 py-2"
          >
            Get Started
          </Button>
          
          {!isAuthenticated && (
            <p className="text-sm text-gray-500">
              Please{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline"
              >
                log in
              </button>
              {' '}to access all features
            </p>
          )}
        </div>

        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-500 hover:underline"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/stock-search')}
                    className="text-blue-500 hover:underline"
                  >
                    Stock Search
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="text-blue-500 hover:underline"
                  >
                    Portfolio
                  </button>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Latest Updates</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/prediction')}
                    className="text-blue-500 hover:underline"
                  >
                    Market Predictions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/learning-center')}
                    className="text-blue-500 hover:underline"
                  >
                    Learning Resources
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;