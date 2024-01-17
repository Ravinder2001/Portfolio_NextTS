import Skill from "@/models/Skill";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
  try {
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

    await connectToDB();
    const data = await Skill.find({ user_id: userSession?.user.id }, { _id: 1, name: 1, image: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
