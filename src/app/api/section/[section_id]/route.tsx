import { connectToDB } from "../../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/route";
import Section from "@/models/Section";

export const PATCH = async (req: Request, { params }: any) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    await connectToDB();
    await Section.updateOne({ _id: params.section_id }, body);
    return new Response(JSON.stringify({ message: "Section Edited Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
