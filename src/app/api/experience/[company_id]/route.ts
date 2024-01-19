import Experience from "@/models/Experience";
import { connectToDB } from "../../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/route";

export const PATCH = async (req: Request, { params }: any) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    await connectToDB();
    await Experience.updateOne({ _id: params.company_id }, { active: body.active });
    return new Response(JSON.stringify({ message: "Company Updated Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
