import LoginBox from "@/components/AdminComponents/LoginBox/LoginBox";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(authoptions);

  if (session) redirect("/admin/dashboard");
 
  return (
    <div>
      <LoginBox />
    </div>
  );
}

export default Page;
