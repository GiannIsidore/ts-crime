"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import AlertAdd from "@/components/AlertAdd";

const complaintSchema = z.object({
  complainant: z.string().min(1, "Complainant is required"),
  respondent: z.string().min(1, "Respondent is required"),
  date_occurrence: z.string().optional(),
  place_occurrence: z.string().optional(),
  complaint_type: z.string().nonempty("Complaint type is required"),
  complaint_details: z.string().min(1, "Complaint details are required"),
  resolution: z.string().min(1, "Resolution is required"),
});
interface Complainants {
  id: number;
  name: string;
}
interface Respondents {
  resident_id: number;
  resident_name: string;
}
interface ComplaintType {
  complaint_type_id: number;
  complaint_type_name: string;
}
type ComplainInput = z.infer<typeof complaintSchema>;

const Form = () => {
  const [complaintTypes, setComplaintTypes] = useState<ComplaintType[]>([]);
  const [complainants, setComplainants] = useState<Complainants[]>([]);
  const [filteredComplainants, setFilteredComplainants] = useState<
    Complainants[]
  >([]);
  const [respondents, setRespondents] = useState<Respondents[]>([]);
  const [filteredRespondents, setFilteredRespondents] = useState<Respondents[]>(
    []
  );
  const [showComplainantSuggestions, setShowComplainantSuggestions] =
    useState<boolean>(false);
  const [showRespondentSuggestions, setShowRespondentSuggestions] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setErrors] = useState<string | null>(null);
  const [sayop, setSayop] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complainantsResponse, respondentsResponse] = await Promise.all([
          fetch(
            "http://localhost/3rdYear/ts-crime/app/php/fetch_complainants.php"
          ),
          fetch(
            "http://localhost/3rdYear/ts-crime/app/php/fetch_respondents.php"
          ),
        ]);

        if (!complainantsResponse.ok || !respondentsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [complainantsData, respondentsData] = await Promise.all([
          complainantsResponse.json(),
          respondentsResponse.json(),
        ]);

        console.log("Complainants Data:", complainantsData);
        console.log("Respondents Data:", respondentsData);

        // Map both residents and outsiders
        const allComplainants = complainantsData.records
          .flatMap((record: any) => [
            { id: record.resident_id, name: record.resident_name },
            { id: record.outsider_id, name: record.outsider_name },
          ])
          .filter((complainant: any) => complainant.name);

        console.log("All Complainants:", allComplainants);

        setComplainants(allComplainants);
        setRespondents(
          respondentsData.records.map((record: any) => ({
            resident_id: record.resident_id,
            resident_name: record.resident_name,
          }))
        );
      } catch (error) {
        setErrors("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ComplainInput>({
    resolver: zodResolver(complaintSchema),
  });
  const handleComplainantSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value.toLowerCase();
    const filtered = complainants.filter((complainant) =>
      complainant.name.toLowerCase().includes(query)
    );
    console.log("Filtered Complainants:", filtered);
    setFilteredComplainants(filtered);
    setShowComplainantSuggestions(query.length > 0);
  };

  const handleRespondentSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value.toLowerCase();
    const filtered = respondents.filter((respondent) =>
      respondent.resident_name.toLowerCase().includes(query)
    );
    console.log("Filtered Respondents:", filtered);
    setFilteredRespondents(filtered);
    setShowRespondentSuggestions(query.length > 0);
  };

  const handleComplainantSuggestionClick = (name: string) => {
    console.log("Complainant Suggestion Clicked:", name);
    setValue("complainant", name);
    setShowComplainantSuggestions(false);
  };

  const handleRespondentSuggestionClick = (name: string) => {
    console.log("Respondent Suggestion Clicked:", name);
    setValue("respondent", name);
    setShowRespondentSuggestions(false);
  };

  const onSubmit: SubmitHandler<ComplainInput> = async (data) => {
    console.log("Form Data Submitted:", data);

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
      console.log("API Response Data:", responseData);

      if (!responseData.success) {
        setError("root", {
          message: responseData.message,
        });
        alert(responseData.message);
        return;
      }
      alert("Complaint filed successfully");
    } catch (error: any) {
      console.error("Error sending data to PHP backend:", error);
      setError("root", {
        message: `Error sending data to PHP backend: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    const fetchComplaintTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost/3rdYear/ts-crime/app/php/fetch_complaint_types.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error("API response indicates failure");
        }
        setComplaintTypes(data.records);
      } catch (error) {
        console.error("Error fetching complaint types:", error);
        setSayop("Error fetching complaint types");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintTypes();
  }, []);

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto p-3 sm:p-4 md:p-5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <div className="relative grid gap-2">
                  <Label htmlFor="complainant">COMPLAINANT</Label>
                  <Controller
                    name="complainant"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...register("complainant")}
                        id="complainant"
                        type="text"
                        placeholder="Search complainants..."
                        onChange={(e) => {
                          field.onChange(e); //! Update ang state
                          handleComplainantSearch(e);
                        }}
                        value={field.value} //! kung unsa naa sa suggestion maoy ma butang sa input
                        className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  />
                  {showComplainantSuggestions && (
                    <div className="absolute bg-white  top-16 shadow-lg max-h-60 overflow-hidden">
                      {filteredComplainants.length > 0 ? (
                        filteredComplainants.map((record) => (
                          <p
                            key={record.name}
                            onClick={() =>
                              handleComplainantSuggestionClick(record.name)
                            }
                            className="cursor-pointer p-2 hover:bg-gray-200"
                          >
                            {record.name}
                          </p>
                        ))
                      ) : (
                        <p>No complainants found</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative grid gap-2">
                  <Label htmlFor="respondent">RESPONDENT</Label>
                  <Controller
                    name="respondent"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...register("respondent")}
                        id="respondent"
                        type="text"
                        placeholder="Search respondents..."
                        onChange={(e) => {
                          field.onChange(e);
                          handleRespondentSearch(e);
                        }}
                        value={field.value}
                        className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  />
                  {showRespondentSuggestions && (
                    <div className="absolute bg-white top-16 shadow-lg max-h-60 overflow-hidden">
                      {filteredRespondents.length > 0 ? (
                        filteredRespondents.map((record) => (
                          <p
                            key={record.resident_id}
                            onClick={() =>
                              handleRespondentSuggestionClick(
                                record.resident_name
                              )
                            }
                            className="cursor-pointer p-2 hover:bg-gray-200"
                          >
                            {record.resident_name}
                          </p>
                        ))
                      ) : (
                        <p>No respondents found</p>
                      )}
                    </div>
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
                  <Label htmlFor="place-address">Where did it happen?</Label>
                  <Input
                    {...register("place_occurrence")}
                    id="place-address"
                    placeholder="Enter the address"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="complaint_type">Type of Complaint</label>
                <Controller
                  name="complaint_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        setValue("complaint_type", value)
                      }
                      value={field.value}
                      name="complaint_type"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>{error}</p>
                        ) : complaintTypes.length > 0 ? (
                          complaintTypes.map((type) => (
                            <SelectItem
                              key={type.complaint_type_id}
                              value={type.complaint_type_id.toString()}
                            >
                              {type.complaint_type_name}
                            </SelectItem>
                          ))
                        ) : (
                          <p>No complaint types available</p>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
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
              <div className="grid gap-2">
                <Label htmlFor="complaint">Resolution</Label>
                <Textarea
                  {...register("resolution")}
                  id="complaint"
                  placeholder="Describe the needed resolution"
                  className="min-h-[150px]"
                />
                {errors.resolution && (
                  <span className="text-red-500">
                    {errors.resolution.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <div className="flex justify-end">
            {" "}
            <Button type="submit">Submit Complaint</Button>
            <CardFooter className="flex justify-end gap-2">
              <AlertAdd />
            </CardFooter>
          </div>
          {errors.root && <div>{errors.root.message}</div>}
        </form>
      </Card>
    </div>
  );
};

export default Form;
