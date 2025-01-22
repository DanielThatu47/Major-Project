import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const PasswordResetEmailSent = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex justify-center">
          <div className="flex items-center justify-center w-full h-16">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Email Sent</h2>
          <p className="text-gray-600 mb-6">
            A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
          </p>
          <Button onClick={handleGoToLogin} className="w-full mb-4">
            Go to Login
          </Button>
          <p className="text-gray-600">
            Didn’t receive the email?{" "}
            <button 
              onClick={handleForgotPassword} 
              className="text-blue-600 hover:underline focus:outline-none">
              Resend Reset Link
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetEmailSent;
