"use client";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
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
  complainant: z.string(),
  respondent: z.string(),
  respondent_address: z.string(),
  date_occurrence: z.string().date(),
  address: z.string(),
  complaint_type: z.string(),
  complaint_details: z.string(),
});
interface Complainants {
  id: number;
  name: string;
}
interface Respondents {
  resident_id: number;
  resident_name: string;
}
type ComplainInput = z.infer<typeof formSchema>;

const Form = () => {
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

        setComplainants(
          complainantsData.records.map((record: any) => ({
            id: record.resident_id || record.outsider_id,
            name: record.resident_name || record.outsider_name,
          }))
        );
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
    resolver: zodResolver(formSchema),
  });

  const handleComplainantSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value.toLowerCase();
    const filtered = complainants.filter((complainant) =>
      complainant.name.toLowerCase().includes(query)
    );
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
    setFilteredRespondents(filtered);
    setShowRespondentSuggestions(query.length > 0);
  };

  const handleComplainantSuggestionClick = (name: string) => {
    setValue("complainant", name);
    setShowComplainantSuggestions(false);
  };

  const handleRespondentSuggestionClick = (name: string) => {
    setValue("respondent", name);
    setShowRespondentSuggestions(false);
  };

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
                <div className="relative grid gap-2">
                  <Label htmlFor="complainant">COMPLAINANT</Label>
                  <Controller
                    name="complainant"
                    control={control}
                    render={({ field }) => (
                      <Input
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
                            key={record.id}
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
                  <Label htmlFor="respondents-address">
                    Where did it happen?
                  </Label>
                  <Input
                    {...register("respondent_address")}
                    id="respondents-address"
                    placeholder="Enter the address"
                  />
                </div>
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
            {errors.root && <div>{errors.root.message}</div>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Form;
