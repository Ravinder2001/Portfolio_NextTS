import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { connectToDB } from "../../../../../lib/Database";
import Project from "@/models/Project";

export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    const body = await request.json();
    console.log("🚀  body:", body)
    const user_id = params.user_id;
    console.log("🚀  user_id:", user_id)
    await connectToDB();
    await Project.updateOne({ user_id }, { $push: { projectList: body } });
    return new Response(JSON.stringify({ message: "Project Added successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
