import { getServerSession } from "next-auth";
import { connectToDB } from "../../../../lib/Database";
import About from "@/models/About";
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
      await About.create(body);
      return new Response(JSON.stringify({ message: "About Details added successfully" }), { status: 200 });
    } else {
      delete body.relation_id;
      await About.updateOne({ _id: body._id }, body);
      return new Response(JSON.stringify({ message: "About Details Edited successfully" }), { status: 200 });
    }
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const data = await About.findOne({ relaiton_id: "asdsad" }, { _id: 1, title: 1, image: 1, des: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
