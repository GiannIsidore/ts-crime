// pages/api/get_cases.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "http://localhost/3rdYear/ts-crime/app/php/case_fetch.php",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // Replace with your actual PHP script URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
