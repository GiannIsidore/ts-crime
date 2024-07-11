"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
interface Case {
  case_id: number;
  complainant: string;
  respondent: string;
  place_of_occurrence: string;
  date_time_occurrence: string;
  complaint_type: string;
  complaint_details: string;
}

export default function CaseTable() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/3rdYear/ts-crime/app/php/case_fetch.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCases(data.cases);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complaint Tracker</CardTitle>
        <CardDescription>
          View and manage all complaints filed with your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complainant</TableHead>
              <TableHead>Respondent</TableHead>
              <TableHead>Case ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.case_id}>
                <TableCell>
                  <div className="font-medium">{caseItem.complainant}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{caseItem.respondent}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{caseItem.case_id}</div>
                </TableCell>
                <TableCell>
                  <div>{caseItem.place_of_occurrence}</div>
                </TableCell>
                <TableCell>
                  <div>{caseItem.date_time_occurrence}</div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="secondary">
                    {caseItem.complaint_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Case</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="flex justify-between items-center">
                        <div>
                          <DrawerTitle className="py-2">
                            {caseItem.complaint_type}
                          </DrawerTitle>
                          <DrawerDescription>
                            CASE ID:{caseItem.case_id}{" "}
                          </DrawerDescription>
                          <br />
                          <p className=" text-sm">COMPLAINANT</p>
                          <p className=" text-sm">- {caseItem.complainant}</p>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {caseItem.date_time_occurrence}
                        </div>
                      </DrawerHeader>
                      <div className="px-4 py-6 prose prose-sm prose-gray dark:prose-invert">
                        <p>{caseItem.complaint_details}</p>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="secondary">
                    Resolved
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">WALA PAY EMPLOYEE</div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-4 w-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Assign to Employee</DropdownMenuItem>
                      <DropdownMenuItem>Close Complaint</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function MoveVerticalIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
