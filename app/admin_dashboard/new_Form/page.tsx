import AlertAdd from "@/components/AlertAdd";
import React from "react";
// import { z } from "zod";

// const formSchema = z.object({
//   first_name: z.string().nonempty("First name is required"),
//   middle_name: z.string().optional(),
//   last_name: z.string().nonempty("Last name is required"),
//   suffix: z.string().optional(),
//   email: z.string().email("Invalid email address").optional(),
//   phone: z.string().nonempty("Phone number is required"),
//   address: z.string().nonempty("Address is required"),
//   is_resident: z.enum(["0", "1"]),
// });
function page() {
  return (
    <div>
      test
      <div>
        <AlertAdd />
      </div>
    </div>
  );
}

export default page;
