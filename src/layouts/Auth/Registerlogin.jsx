"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import api from "../../lib/axios"; 

const RegisterLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm((prev) => ({ ...prev, file: e.target.files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post("/api/v1/user/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token); 
        toast.success(`Welcome back, ${res.data.user.name}`);
         window.location.href = "/"; 
      } else {
        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("password", form.password);
        if (form.file) data.append("file", form.file);

        const res = await api.post("/api/v1/user/register", data);
        toast.success(`Registered as ${res.data.user.name}`);
         window.location.href = "/"; 
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <Card className="w-full max-w-md bg-gray-800 border-none shadow-2xl">
        <CardContent className="p-6 text-white">
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
              onChange={handleChange}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              className="bg-gray-700 text-white"
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <>
                <Label htmlFor="file">Profile Picture</Label>
                <Input
                  name="file"
                  type="file"
                  accept="image/*"
                  className="bg-gray-700 text-white"
                  onChange={handleChange}
                />
              </>
            )}
            <Button className="w-full mt-4 bg-amber-300" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
            <p className="text-sm text-center mt-4 text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register here" : "Login here"}
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default RegisterLogin;
