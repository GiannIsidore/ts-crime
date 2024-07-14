import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCDB - Login",
  description: "A database of crimes in Kauswagan, Cagayan de Oro City.",
  icons: {
    icon: "/cdb.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
