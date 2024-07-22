"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().nonempty("Last name is required"),
  suffix: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  is_resident: z.enum(["0", "1"]),
});

type ResidencyFormInput = z.infer<typeof formSchema>;

const AlertAdd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResidencyFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_resident: "0", // Default to '0' (outsider)
    },
  });

  const isResidentValue = watch("is_resident", "0");

  const onSubmit: SubmitHandler<ResidencyFormInput> = async (data) => {
    console.log(data);

    try {
      const response = await fetch("/api/handle_residency", {
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
        console.log("Error sending data to PHP backend:", responseData.message);
        return;
      }
    } catch (error: any) {
      console.error("Error sending data to PHP backend:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-black text-white font-semibold text-lg rounded-full px-3 p-1">
        +
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Entry</AlertDialogTitle>
          <AlertDialogDescription>
            <Card className="max-w-lg h-96 overflow-y-scroll mx-auto">
              <CardHeader>
                <CardTitle>Resident Information</CardTitle>
                <CardDescription>
                  Please fill out the form below to confirm your residency and
                  provide additional details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input id="first_name" {...register("first_name")} />
                    {errors.first_name && (
                      <span className="text-red-500">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="middle_name">Middle Name</Label>
                    <Input id="middle_name" {...register("middle_name")} />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" {...register("last_name")} />
                    {errors.last_name && (
                      <span className="text-red-500">
                        {errors.last_name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="suffix">Suffix</Label>
                    <Input id="suffix" {...register("suffix")} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} />
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("address")} />
                    {errors.address && (
                      <span className="text-red-500">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="is_resident"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          placeholder="is_resident"
                          id="is_resident"
                          checked={field.value === "1"}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement; // Type assertion
                            const newValue = target.checked ? "1" : "0";
                            console.log("Checkbox changed:", newValue); // Debugging log
                            setValue("is_resident", newValue, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            field.onChange(newValue); // Ensure the field's onChange is called with the new value
                          }}
                        />
                      )}
                    />
                    <p>Current is_resident value: {isResidentValue}</p>
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mr-8">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAdd;
