"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fname: z.string(),
  mname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  number: z.string(),
  respondent: z.string(),
  respondent_address: z.string(),
  date_occurrence: z.string().date(),
  address: z.string(),
  complaint_type: z.string(),
  complaint_details: z.string(),
});

type ComplainInput = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ComplainInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ComplainInput> = async (data) => {
    console.log(data);

    try {
      const response = await fetch("/api/handle_complain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorMessage}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);

      if (!responseData.success) {
        setError("root", {
          message: responseData.message,
        });
        return;
      }
    } catch (error: any) {
      console.error("Error sending data to PHP backend:", error);
      setError("root", {
        message: `Error sending data to PHP backend: ${error.message}`,
      });
    }
  };

  return (
    <div className="flex flex-1  w-fit  justify-center ">
      <Card className=" max-w-[80vw]   mx-auto p-3 sm:p-4 md:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              File a Complaint
            </CardTitle>
            <CardDescription>
              Use this form to report an issue in your barangay. We will look
              into it and get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fname">Firstname</Label>
                  <Input
                    {...register("fname")}
                    id="fname"
                    placeholder="Enter your first name"
                  />
                  {errors.fname && (
                    <span className="text-red-500">{errors.fname.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mname">Middlename (optional)</Label>
                  <Input
                    {...register("mname")}
                    id="mname"
                    placeholder="Enter your middle name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lname">Lastname</Label>
                  <Input
                    {...register("lname")}
                    id="lname"
                    placeholder="Enter your last name"
                  />
                  {errors.lname && (
                    <span className="text-red-500">{errors.lname.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    {...register("number")}
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                  {errors.number && (
                    <span className="text-red-500">
                      {errors.number.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="respondents">Who are the respondents?</Label>
                  <Input
                    {...register("respondent")}
                    id="respondents"
                    placeholder="Enter the respondents"
                  />
                  {errors.respondent && (
                    <span className="text-red-500">
                      {errors.respondent.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="when-happened">When did it happen?</Label>
                  <Input
                    {...register("date_occurrence")}
                    id="when-happened"
                    type="date"
                  />
                  {errors.date_occurrence && (
                    <span className="text-red-500">
                      {errors.date_occurrence.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="respondents-address">
                    Respondents Address (optional)
                  </Label>
                  <Input
                    {...register("respondent_address")}
                    id="respondents-address"
                    placeholder="Enter the respondents address"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  {...register("address")}
                  id="address"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complaint_type">Type of Complaint</Label>
                <Select
                  onValueChange={(value) => setValue("complaint_type", value)}
                >
                  <SelectTrigger id="complaint_type">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noise">Noise</SelectItem>
                    <SelectItem value="garbage">Garbage</SelectItem>
                    <SelectItem value="infrastructure">
                      Infrastructure
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.complaint_type && (
                  <span className="text-red-500">
                    {errors.complaint_type.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complaint">Complaint Details</Label>
                <Textarea
                  {...register("complaint_details")}
                  id="complaint"
                  placeholder="Describe the issue in detail"
                  className="min-h-[150px]"
                />
                {errors.complaint_details && (
                  <span className="text-red-500">
                    {errors.complaint_details.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              Submit Complaint
            </Button>
            {errors.root && (
              <div className="text-red-500 ml-4">{errors.root.message}</div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Form;
