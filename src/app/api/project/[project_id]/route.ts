import Experience from "@/models/Experience";
import { connectToDB } from "../../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/route";
import Project from "@/models/Project";

export const PATCH = async (req: Request, { params }: any) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    await connectToDB();
    await Project.updateOne({ _id: params.project_id }, { active: body.active });
    return new Response(JSON.stringify({ message: "Project Updated Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
