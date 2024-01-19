import { NextApiRequest } from "next";
import Hero from "@/models/Hero";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await Hero.findOne({ relaiton_id: ENVConfig.relation_id }, { _id: 1, title: 1, role: 1, des: 1, location: 1, image: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
