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
import { error } from "console";

const formSchema = z.object({
  fname: z.string(),
  mname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  number: z.string(),
  respondent: z.string(),
  respondent_address: z.string(),
  date_occurence: z.string().date(),
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
    formState: { errors, isSubmitting, isSubmitted },
    setError,
  } = useForm<ComplainInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ComplainInput> = async (data) => {
    console.log(data);
    try {
      const request = await fetch("http://localhost:3000/api/handle_complain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const response = await request.json();
      console.log(response);
      const { data: userData } = await response;
      console.log(userData);
    } catch (error) {
      console.error(error);
      // setError("root", {
      //   message: "error",
      // });
    }
  };
  // async function onSubmit() {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/handle_complain",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           /* your data here */
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     // Check if the response is JSON before parsing
  //     const contentType = response.headers.get("content-type");
  //     if (!contentType || !contentType.includes("application/json")) {
  //       throw new Error("Received non-JSON response from the server");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error during fetch operation:", error.message);
  //   }
  // }
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto p-3 sm:p-4 md:p-5">
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="respondents">Who are the respondents?</Label>
                  <Input
                    {...register("respondent")}
                    id="respondents"
                    placeholder="Enter the respondents"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="when-happened">When did it happen?</Label>
                  <Input
                    {...register("date_occurence")}
                    id="when-happened"
                    type="date"
                  />
                  {/* <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("date_occurence")}
                    id="when-happened"
                    type="date"
                  /> */}
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complaint_type">Type of Complaint</Label>
                <Select
                  onValueChange={(event) => setValue("complaint_type", event)}
                >
                  <SelectTrigger id="complaint_type">
                    <SelectValue
                      {...register("complaint_type")}
                      placeholder="Select complaint type"
                    />
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complaint">Complaint Details</Label>
                <Textarea
                  {...register("complaint_details")}
                  id="complaint"
                  placeholder="Describe the issue in detail"
                  className="min-h-[150px]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Submit Complaint</Button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Form;
