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
      {/* <div className="">
      <div className="flex justify-center items-center mt-[14vh]">
        <div className="w-[30vw] h-[65vh] border-black border rounded-[10px] p-[6vh] bg-stone-500/10">
        
          <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>Email</Label>
              <Input type="text" {...register("email")} className="mt-[0.6vw]" />
              {errors.email && (<div className="text-red-500 text-sm">{errors.email.message}</div>)}
              <div className="p-[0.6vw]" />
              <Label className="">Password</Label>
              <Input type="password" {...register("password")} className="my-[1vh]" />
              {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
              <br />
              <Button className='w-full' type="submit">Login</Button>
              { loginMessage && (<div className="text-red-500 text-base">{loginMessage}</div>)}
            </form>
          <br />
          <div>
            <p>Forgot Password? <Link className="underline cursor-pointer" href="/register">Click here!</Link></p>
          </div>
        </div>
      </div>
      {/* <div className='fixed top-1 right-1 mt-1 mr-1'>
        <ModeToggle/>
      </div> 
    </div> */}
      <div className="grid lg:grid-cols-2 w-full min-h-screen">
        <div className="flex items-center justify-center bg-muted p-8 lg:p-12 order-2 lg:order-1">
          <img
            src="/cdbBlck.svg"
            alt="Login Illustration"
            width={440}
            height={280}
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
          <Card className="w-full max-w-md">
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
                <div>
                  <p>
                    Forgot Password?{" "}
                    <Link className="underline cursor-pointer" href="#">
                      Click here!
                    </Link>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 md:flex-row">
                <Button className="w-full md:w-auto" type="submit">
                  Sign in
                </Button>

                {loginMessage && (
                  <div className="text-red-500 text-base">{loginMessage}</div>
                )}
                <Button variant="outline" className="w-full md:w-auto">
                  Sign up
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
