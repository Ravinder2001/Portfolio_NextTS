import { getServerSession } from "next-auth";
import { connectToDB } from "../../../../lib/Database";
import About from "@/models/About";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    await About.create(body);
    return new Response(JSON.stringify({ message: "About Details added successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    await connectToDB();
    const data = await About.findOne({ user_id: userSession?.user.id }, { _id: 1, title: 1, image: 1, des: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};