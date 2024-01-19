import Review from "@/models/Review";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import Section from "@/models/Section";

export const GET = async (req: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const res = await Section.find({ relation_id: userSession?.user.name }, { name: 1, active: 1 });
    return new Response(JSON.stringify({ data: res }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
export const POST = async (req: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    body.map((item: any) => (item.relation_id = userSession.user.name));

    await connectToDB();
    await Section.insertMany(body);
    return new Response(JSON.stringify({ message: "Section created " }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
