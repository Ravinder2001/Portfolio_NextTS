import Project from "@/models/Project";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    await Project.create(body);
    return new Response(JSON.stringify({ message: "Project added Success" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async () => {
  try {
    const userSession = await getServerSession(authoptions);

    await connectToDB();
    const data = await Project.find({ user_id: userSession?.user.id }, { _id: 1,name:1,type:1,des:1,image:1,tech:1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
