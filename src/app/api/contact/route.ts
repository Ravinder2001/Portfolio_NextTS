import About from "@/models/About";
import { connectToDB } from "../../../../lib/Database";
import Contact from "@/models/Contact";
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
    await Contact.insertMany(body);
    return new Response(JSON.stringify({ message: "Contact Details Added successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
export const PUT = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    await connectToDB();

    const updates = body.map((item: any) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: item },
      },
    }));

    await Contact.bulkWrite(updates);

    return new Response(JSON.stringify({ message: "Contact Details Updated successfully" }), { status: 200 });
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
    const data = await Contact.find({ relaiton_id: userSession?.user.name }, { _id: 1, name: 1, link: 1, active: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
