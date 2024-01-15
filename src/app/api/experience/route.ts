import Experience from "@/models/Experience";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    await Experience.create(body);
    return new Response(JSON.stringify({ message: "Experience Details Added" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
export const GET = async () => {
  try {
    const userSession = await getServerSession(authoptions);

    await connectToDB();
    const data = await Experience.find({ user_id: userSession?.user.id }, { _id: 1, company: 1, role: 1, des: 1, duration: 1, logo: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
