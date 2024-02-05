import Skill from "@/models/Skill";
import { connectToDB } from "../../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/route";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const DELETE = async (request: Request, params: Params) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Skill.deleteOne({ _id: params.params.skill_id });

    return new Response(JSON.stringify({ message: "Skill created successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
