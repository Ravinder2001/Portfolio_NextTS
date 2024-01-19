import { NextApiRequest } from "next";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import About from "@/models/About";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await About.findOne({ relaiton_id: ENVConfig.relation_id }, { _id: 1, title: 1, image: 1, des: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
