import Experience from "@/models/Experience";
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
      await Experience.create(body);
      return new Response(JSON.stringify({ message: "Experience Details Added" }), { status: 200 });
    } else {
      await Experience.updateOne({ _id: body._id }, body);
      return new Response(JSON.stringify({ message: "Experience Details Edited" }), { status: 200 });
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
    const data = await Experience.find({ relaiton_id: userSession?.user.name }, { _id: 1, company: 1, role: 1, des: 1, duration: 1, image: 1,active:1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
export const PATCH = async (req: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    return new Response(JSON.stringify({ message: "Company Deleted Succesfully" }), { status: 200 });
    await connectToDB();
    await Experience.deleteOne({ _id: body.id });
    return new Response(JSON.stringify({ message: "Company Deleted Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
