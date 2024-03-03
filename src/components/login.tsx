"use client";

import { useState } from "react";
import { supabase } from "@/components/utils/supabaseClient";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    console.log('login');
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error.message);
      toast.error(`Login error: ${error.message}`);
    } else {
      toast.success('Logged in successfully');
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    }
  }, [isLoggedIn]);

  return (
    <Card className="mx-auto max-w-sm">
      <form onSubmit={handleLogin}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link className="ml-auto inline-block text-sm underline" href="#">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" variant="outline">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Dont have an account?
            <Link className="underline" href="#">
              Sign up
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
