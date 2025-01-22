import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Sending request to the backend to initiate the reset process
      const response = await axios.post('https://stockbuddybackend.vercel.app/api/auth/forgot-password', data);

      // Check if the response indicates success
      if (response.data.success) {
        const resetToken = response.data.resetToken;

        // Ensure the backend provides the reset token
        if (!resetToken) {
          throw new Error('Reset token not provided by the server.');
        }

        // Send the reset link email via EmailJS
        const emailResponse = await emailjs.send(
          'service_swi2wcg',
          'template_wxhikne',
          {
            to_email: data.email,
            reset_link: `${window.location.origin}/reset-password/${resetToken}`,
          },
          'h8T4SXdcvyZ6g0pvg'
        );

        // If email sending was successful, navigate to the next page
        if (emailResponse.status === 200) {
          navigate('/password-reset-email-sent');
        } else {
          throw new Error('Failed to send email. Please try again later.');
        }
      } else {
        throw new Error(response.data.message || 'Failed to process password reset.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message || error.message || 'Failed to send reset link. Please try again.',
        {
          duration: 5000,
          style: {
            background: '#f87171',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;