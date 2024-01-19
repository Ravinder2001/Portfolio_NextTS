import { NextApiRequest } from "next";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import Experience from "@/models/Experience";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await Experience.find(
      { relaiton_id: ENVConfig.relation_id, active: true },
      { _id: 1, company: 1, role: 1, des: 1, duration: 1, image: 1 }
    ).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
