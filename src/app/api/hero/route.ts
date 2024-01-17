import User from "@/models/User";
import { NextApiRequest } from "next";
import { connectToDB } from "../../../../lib/Database";
import Hero from "@/models/Hero";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    if (!body._id) {
      await Hero.create(body);
      return new Response(JSON.stringify({ message: "Hero details Added Succesfully" }), { status: 200 });
    } else {
      await Hero.updateOne({ _id: body._id }, body);
      return new Response(JSON.stringify({ message: "Hero details Edited Succesfully" }), { status: 200 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
export const GET = async () => {
  try {
    const user_session = await getServerSession(authoptions);

    if (!user_session) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const data = await Hero.findOne({ user_id: user_session?.user.id }, { _id: 1, title: 1, role: 1, des: 1, location: 1,image:1 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
