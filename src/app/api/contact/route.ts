import About from "@/models/About";
import { connectToDB } from "../../../../lib/Database";
import Contact from "@/models/Contact";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    await Contact.create(body);
    return new Response(JSON.stringify({ message: "Contact Details Added successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    await connectToDB();
    const data = await Contact.find({ user_id: userSession?.user.id }, { _id: 1, name: 1, link: 1, active: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};