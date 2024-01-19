import Review from "@/models/Review";
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
      await Review.create(body);
      return new Response(JSON.stringify({ message: "Review created successfully" }), { status: 200 });
    } else {
      await Review.updateOne({ _id: body._id }, body);
      return new Response(JSON.stringify({ message: "Review Edited successfully" }), { status: 200 });
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
    const data = await Review.find({ relaiton_id: userSession?.user.name }, { _id: 1, name: 1, star: 1, des: 1, active: 1 });
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
    await connectToDB();
    await Review.deleteOne({ _id: body.id });
    return new Response(JSON.stringify({ message: "Review Deleted Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};