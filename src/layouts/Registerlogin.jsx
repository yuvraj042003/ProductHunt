"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "sonner";

const RegisterLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${form.email}`,
      });
    } else {
      toast({
        title: "Registration Successful",
        description: `Account created for ${form.name}`,
      });
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <Card className="w-full  shadow-2xl border-none rounded-2xl bg-gray-800 text-white p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-gray-700 text-white"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="bg-gray-700 text-white"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              className="bg-gray-700 text-white"
              value={form.password}
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <Label htmlFor="mobile">Mobile No</Label>
                <Input
                  name="mobile"
                  type="text"
                  placeholder="+91 9876543210"
                  className="bg-gray-700 text-white"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <Button type="submit" className="w-full mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors">
              {isLogin ? "Login" : "Register"}
            </Button>

            <p className="text-sm text-center mt-4 text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-blue-400 cursor-pointer underline ml-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register here" : "Login here"}
              </span>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Toasts */}
      <Toaster />
    </div>
  );
};

export default RegisterLogin;
