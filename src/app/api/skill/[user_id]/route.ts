import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { connectToDB } from "../../../../../lib/Database";
import Skill from "@/models/Skill";

export const PUT = async (request: Request, { params }: Params) => {
  try {
    console.log("hii");
    const user_id = params.user_id;
    const body = await request.json();
    await connectToDB();
    await Skill.updateOne({ user_id }, { $push: { technologyList: body } });
    return new Response(JSON.stringify({ message: "Skill updated successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
