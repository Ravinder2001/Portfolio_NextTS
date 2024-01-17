import Skill from "@/models/Skill";
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

    await Promise.all(
      body.map(async (data: any) => {
        if (data._id.length > 5) {
          delete data.relation_id;
          await Skill.updateOne({ _id: data._id }, data);
        } else {
          delete data._id;
          await Skill.create(data);
        }
      })
    );

    return new Response(JSON.stringify({ message: "Skill created successfully" }), { status: 200 });
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
    const data = await Skill.find({ relaiton_id: userSession?.user.name }, { _id: 1, name: 1, image: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
