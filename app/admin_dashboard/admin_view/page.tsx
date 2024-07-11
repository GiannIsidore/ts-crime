``;
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CartesianGrid,
  XAxis,
  Area,
  AreaChart,
  Line,
  LineChart,
} from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import React from "react";

export default function AdminView() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Crime Ratings
              </CardTitle>
              <ClipboardListIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Downtown</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>
                      <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Uptown</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>
                      <TrendingDownIcon className="w-4 h-4 text-red-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Suburbs</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>
                      <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Industrial Zone</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>
                      <TrendingDownIcon className="w-4 h-4 text-red-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Riverside</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>
                      <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Top Criminals
              </CardTitle>
              <UserCheckIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        className="rounded-full"
                        alt="Criminal"
                      />
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">
                          Robbery, Assault
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Most Wanted</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        className="rounded-full"
                        alt="Criminal"
                      />
                      <div>
                        <div className="font-medium">Jane Smith</div>
                        <div className="text-xs text-muted-foreground">
                          Fraud, Theft
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Repeat Offender</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        className="rounded-full"
                        alt="Criminal"
                      />
                      <div>
                        <div className="font-medium">Michael Johnson</div>
                        <div className="text-xs text-muted-foreground">
                          Burglary, Vandalism
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Wanted</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        className="rounded-full"
                        alt="Criminal"
                      />
                      <div>
                        <div className="font-medium">Emily Davis</div>
                        <div className="text-xs text-muted-foreground">
                          Drug Trafficking
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">High Priority</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Crimes</CardTitle>
              <TrendingUpIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Robbery</div>
                      <div className="text-xs text-muted-foreground">
                        25% increase this month
                      </div>
                    </div>
                    <Progress value={75} aria-label="75% increase" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Assault</div>
                      <div className="text-xs text-muted-foreground">
                        15% increase this month
                      </div>
                    </div>
                    <Progress value={60} aria-label="60% increase" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Theft</div>
                      <div className="text-xs text-muted-foreground">
                        10% increase this month
                      </div>
                    </div>
                    <Progress value={50} aria-label="50% increase" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Burglary</div>
                      <div className="text-xs text-muted-foreground">
                        8% increase this month
                      </div>
                    </div>
                    <Progress value={40} aria-label="40% increase" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Vandalism</div>
                      <div className="text-xs text-muted-foreground">
                        5% increase this month
                      </div>
                    </div>
                    <Progress value={30} aria-label="30% increase" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ClipboardListIcon(props: React.ComponentProps<"svg">) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function MapIcon(props: React.ComponentProps<"svg">) {
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
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

function TrendingDownIcon(props: React.ComponentProps<"svg">) {
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
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function TrendingUpIcon(props: React.ComponentProps<"svg">) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function UserCheckIcon(props: React.ComponentProps<"svg">) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
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
