import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
const formSchema = z.object({
  complainant: z.string(),
  respondent: z.string(),
  respondent_address: z.string(),
  date_occurrence: z.string().date(),
  address: z.string(),
  complaint_type: z.string(),
  complaint_details: z.string(),
  resolution: z.string(),
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
type ComplainInput = z.infer<typeof formSchema>;
const Search = () => {
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

  return (
    <div>
      {" "}
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
                      handleRespondentSuggestionClick(record.resident_name)
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
    </div>
  );
};

export default Search;
