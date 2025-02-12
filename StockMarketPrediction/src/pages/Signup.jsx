import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Mail, UserPlus, Eye, EyeOff } from 'lucide-react';
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

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [modalState, setModalState] = React.useState({ isOpen: false, title: '', message: '', type: 'success' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading state

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true); // Show loader
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/auth/signup', data);
      if (response.data.success) {
        login(response.data.token);
        setModalState({
          isOpen: true,
          title: 'Registration Successful',
          message: 'Welcome to StockPredict! Your account has been created successfully.',
          type: 'success'
        });
      } else {
        setModalState({
          isOpen: true,
          title: 'Registration Failed',
          message: response.data.message || 'Unable to create account',
          type: 'error'
        });
      }
    } catch (error) {
      setModalState({
        isOpen: true,
        title: 'Registration Failed',
        message: error.response?.data?.message || 'Unable to create account',
        type: 'error'
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSocialSignup = (provider) => {
    setModalState({
      isOpen: true,
      title: `Social Sign Up`,
      message: `${provider} sign up needs to be implemented`,
      type: 'info'
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className={`relative container mx-auto flex items-center justify-center p-4 ${loading ? "pointer-events-none overflow-hidden" : ""}`}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred signup method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Button variant="outline" onClick={() => handleSocialSignup('Facebook')} className="w-full">
                <Facebook className="w-4 h-4 mr-2" />
              </Button>
              <Button variant="outline" onClick={() => handleSocialSignup('Github')} className="w-full">
                <Github className="w-4 h-4 mr-2" />
              </Button>
              <Button variant="outline" onClick={() => handleSocialSignup('Google')} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
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
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Create a password" {...field} />
                        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type={showPassword ? "text" : "password"} placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
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

export default Signup;