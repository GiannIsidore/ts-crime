"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormTitle from "@/components/form_title";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginInput = z.infer<typeof formSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(formSchema),
  });

  const [loginMessage, setLoginMessage] = useState();

  const onSubmit = async (data: LoginInput) => {
    console.log(data);
    try {
      const request = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();
      const { message, error } = await response;
      if (error) {
        setLoginMessage(error.message);
      } else if (message) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src="/cdbBlck.svg"
            alt="Login Illustration"
            width={440}
            height={280}
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-sm">
            <CardHeader>
              {" "}
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter your email and password to sign in to your account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    type="text"
                    {...register("email")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </div>
                {/* <div>
                  <p>
                    Forgot Password?{" "}
                    <Link className="underline cursor-pointer" href="#">
                      Click here!
                    </Link>
                  </p>
                </div> */}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 md:flex-row">
                <Button className="w-full md:w-auto" type="submit">
                  Sign in
                </Button>

                {loginMessage && (
                  <div className="text-red-500 text-base">{loginMessage}</div>
                )}
                {/* <Button variant="outline" className="w-full md:w-auto">
                  Sign up
                </Button> */}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
