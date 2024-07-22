import { Metadata } from "next";
import LoginForm from "@/components/login_form";

export const metadata: Metadata = {
  title: "CCDB - Login",
  description: "A database of crimes in Kauswagan, Cagayan de Oro City.",
  icons: {
    icon: "/cdb.svg",
  },
};
export default function Home() {
  return (
    <div className="flex items-center justify-center  h-screen">
      <LoginForm />
    </div>
  );
}
