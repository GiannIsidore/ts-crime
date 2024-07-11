"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "dateTime", order: "asc" });
  //! This is a dummy data. Replace it with actual data from the database.... HOW?
  const complaints = useMemo(
    () =>
      [
        {
          caseId: "C001",
          complainantName: "John Doe",
          respondentName: "Jane Smith",
          placeOfOccurrence: "123 Main St, Anytown USA",
          dateTime: "2023-06-01 10:30 AM",
          complaintType: "Harassment",
          complaintDetails:
            "Respondent has been making inappropriate comments.",
          status: "Pending",
          employeeName: "Alice Johnson",
        },
      ]
        .filter((complaint) => {
          const searchValue = search.toLowerCase();
          return (
            complaint.caseId.toLowerCase().includes(searchValue) ||
            complaint.complainantName.toLowerCase().includes(searchValue) ||
            complaint.respondentName.toLowerCase().includes(searchValue) ||
            complaint.placeOfOccurrence.toLowerCase().includes(searchValue) ||
            complaint.complaintType.toLowerCase().includes(searchValue) ||
            complaint.status.toLowerCase().includes(searchValue) ||
            complaint.employeeName.toLowerCase().includes(searchValue)
          );
        })
        .sort((a, b) => {
          const key = sort.key as keyof typeof a;
          if (sort.order === "asc") {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        }),
    [search, sort]
  );
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Search complaints..."
          className="bg-white dark:bg-gray-950 flex-1 mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">New Complaint</Button>
        </div>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "caseId",
                    order:
                      sort.key === "caseId"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Case ID
                {sort.key === "caseId" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "complainantName",
                    order:
                      sort.key === "complainantName"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Complainant
                {sort.key === "complainantName" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "respondentName",
                    order:
                      sort.key === "respondentName"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Respondent
                {sort.key === "respondentName" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "placeOfOccurrence",
                    order:
                      sort.key === "placeOfOccurrence"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Place
                {sort.key === "placeOfOccurrence" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "dateTime",
                    order:
                      sort.key === "dateTime"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Date & Time
                {sort.key === "dateTime" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "complaintType",
                    order:
                      sort.key === "complaintType"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Type
                {sort.key === "complaintType" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "status",
                    order:
                      sort.key === "status"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Status
                {sort.key === "status" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "employeeName",
                    order:
                      sort.key === "employeeName"
                        ? sort.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  })
                }
              >
                Employee
                {sort.key === "employeeName" && (
                  <span className="ml-1">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.caseId}>
                <TableCell className="font-medium">
                  {complaint.caseId}
                </TableCell>
                <TableCell>{complaint.complainantName}</TableCell>
                <TableCell>{complaint.respondentName}</TableCell>
                <TableCell>{complaint.placeOfOccurrence}</TableCell>
                <TableCell>{complaint.dateTime}</TableCell>
                <TableCell>{complaint.complaintType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      complaint.status === "Resolved"
                        ? "secondary"
                        : complaint.status === "Pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>{complaint.employeeName}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
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
      </Card>
    </div>
  );
}

function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
