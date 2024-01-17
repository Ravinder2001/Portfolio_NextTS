import Project from "@/models/Project";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    await connectToDB();
    if (!body._id) {
      await Project.create(body);
      return new Response(JSON.stringify({ message: "Project added Successfully" }), { status: 200 });
    } else {
      await Project.updateOne({ _id: body._id }, body);
      return new Response(JSON.stringify({ message: "Project Edited Successfully" }), { status: 200 });
    }
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async () => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const data = await Project.find({ relaiton_id: userSession?.user.name }, { _id: 1, name: 1, type: 1, des: 1, image: 1, tech: 1,active:1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
