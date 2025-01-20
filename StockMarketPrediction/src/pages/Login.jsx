import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import CustomModal from '@/components/CustomModal';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [modalState, setModalState] = React.useState({ isOpen: false, title: '', message: '', type: 'success' });
  const [showPassword, setShowPassword] = React.useState(false); // State for password visibility
  const [loading, setLoading] = React.useState(false); // Loading state

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true); // Show loader
    try {
      const response = await axios.post('https://stockbuddybackend.vercel.app/api/auth/login', data);
      if (response.data.success) {
        login(response.data.token);
        setModalState({
          isOpen: true,
          title: 'Login Successful',
          message: 'Welcome back! You have successfully logged in.',
          type: 'success'
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          'Unable to connect to the server. Please try again later.';
      setModalState({
        isOpen: true,
        title: 'Login Failed',
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSocialLogin = (provider) => {
    setModalState({
      isOpen: true,
      title: `Social Login`,
      message: `${provider} login needs to be implemented`,
      type: 'info'
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
      <div className={`relative container mx-auto flex items-center justify-center p-4 ${loading ? "pointer-events-none overflow-hidden" : ""}`}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full"
              >
                <Facebook className="w-4 h-4 mr-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Github')}
                className="w-full"
              >
                <Github className="w-4 h-4 mr-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Google')}
                className="w-full"
              >
                <FontAwesomeIcon icon={faGoogle} className="w-4 h-4 mr-2" />
              </Button>
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="relative">
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password" 
                            {...field} 
                          />
                          <span 
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Loader with blurred background */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      
      <CustomModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
};

export default Login;