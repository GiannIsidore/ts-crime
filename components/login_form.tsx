"use client"
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormTitle from '@/components/form_title';


const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type LoginInput = z.infer<typeof formSchema>;

const LoginForm = () => {

  const { register, handleSubmit, setValue, formState: { isSubmitting, isSubmitted, errors} } = useForm<LoginInput>({
    resolver: zodResolver(formSchema)
  });
  const loginMessage = "";

  const onSubmit = async (data: LoginInput)  => {
    console.log(data)
    try {
      const request = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const response = await request.json();
      const {data: userData, error} = await response;

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="">
      <div className="flex justify-center items-center mt-[14vh]">
        <div className="w-[30vw] h-[65vh] border-black border rounded-[10px] p-[6vh] bg-stone-500/10">
          <FormTitle title="Login" />
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
              {/* { loginMessage && <div className="text-red-500 text-base">{loginMessage}</div>} */}
            </form>
          <br />
          <div>
            <p>Forgot Password? <Link className="underline cursor-pointer" href="/register">Click here!</Link></p>
          </div>
        </div>
      </div>
      {/* <div className='fixed top-1 right-1 mt-1 mr-1'>
        <ModeToggle/>
      </div> */}
    </div>
    </>
  );
}

export default LoginForm;


